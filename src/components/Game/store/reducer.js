import * as R from "ramda";
import { toast } from "react-toastify";

import {
  SET_MAZE,
  MAKE_STEP,
  SET_TEXTAREA,
  mazeValidateRule
} from "./constants";
import { MAZE_SHAPES, DIRECTION } from "../constants";
import { Graph, isInteger, replaceAt } from "../../utils";
import { getDirectionMeta } from "../utils";
import {
  vertexDirections,
  getInstruction,
  getRotateDirection,
  getRotationDeg,
  getMatrixCoords
} from "./utils";

export const initialState = {
  textareaValue: "",
  rowLength: 0,
  colLength: 0,
  maze: [],
  human: {
    shape: "",
    position: 0
  },
  shortestExitPath: [],
  shortestPathStep: 0,
  instructions: [],
  directions: [],
  step: 0
};

const { TREE, SPACE } = MAZE_SHAPES;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_MAZE: {
      const splitedArr = action.payload.split("\n");

      /* Validate if payload has banned symbols */
      const validate = action.payload.match(mazeValidateRule);
      if (!validate) {
        toast.error(
          "You could use only '#' ' ' '>' 'v' '^' '<'\n Bare in mind, one of the symbols always need to be arrow !"
        );
        return state;
      }

      /* Get row and column length of maze */
      const colLength = splitedArr.length;
      const maze = R.compose(
        R.split(""),
        R.join("")
      )(splitedArr);
      const rowLength = maze.length / colLength;

      /* Validation */
      if (R.not(isInteger(rowLength))) {
        toast.error("Maze should be rectangle!");
        return state;
      }

      if (maze.length < 9) {
        toast.error("Maze length is less than 9 symbols!");
        return state;
      }

      const graph = new Graph();

      let exitNodes = [];
      let human = R.clone(state.human);

      /* Connected human verteces { path: weight } */
      let humanKeysByDirection = {};

      for (let index = 0; index < maze.length; index++) {
        const vertex = maze[index];

        /* Get human info if it is situated in this vertex */
        const isHuman = getDirectionMeta(vertex);

        let connectedVertices = {};

        if (vertex === SPACE || isHuman) {
          /* Iterate by four connected verteces [top, right, left, bottom] */
          for (const directionKey of Object.keys(vertexDirections)) {
            const direction = vertexDirections[directionKey];

            const vertexIndex = direction.getConnectedIndex(index, rowLength);
            /* Returns true if connected vertex is not tree */
            const hasDirection = direction.hasDirection(
              vertexIndex,
              rowLength,
              colLength
            );

            if (maze[vertexIndex] === TREE && hasDirection) continue;
            //Check if it is not a border element
            if (hasDirection) {
              /* Set weight 0 as it is a step up in the same direction as previous */
              connectedVertices = R.assoc(
                vertexIndex.toString(),
                0,
                connectedVertices
              );
            } else {
              //if it is border element that is " " it could be an exit
              exitNodes = R.append(index.toString(), exitNodes);
            }

            /* Validate */
            if (isHuman && R.not(hasDirection)) {
              toast.error("Human can't be in the corner of maze!");
              return state;
            }

            if (isHuman) {
              humanKeysByDirection[directionKey] = vertexIndex;
            }
          }
          graph.addVertex(index, connectedVertices);
        }
        if (isHuman) {
          human = R.clone(isHuman);
          human.position = index;
        }
      }
      /*
        Set connected to human position weights,
        depending on the distance of rotation to connected vertex
      */
      for (const key of Object.keys(DIRECTION)) {
        const { name, index } = DIRECTION[key];

        const humanPosition = human.position;
        const currentWeight = human.weight[index];
        const connectedVertexIndex = humanKeysByDirection[name];
        if (!connectedVertexIndex) continue;

        graph.vertices[connectedVertexIndex][humanPosition] = currentWeight;

        graph.vertices[humanPosition][connectedVertexIndex] = currentWeight;
      }

      /* Validate */
      if (!exitNodes.length) {
        toast.error("No exits found!");
        return state;
      }

      let shortestExitPath = [];
      let lowestWeight = Infinity;
      let lowestPriorities = null;

      for (const exitNode of exitNodes) {
        const currentExitPath = graph
          .shortestPath(human.position.toString(), exitNode)
          .concat([human.position.toString()])
          .reverse();
        /* Checkout by summary of all rotating weights */
        if (
          graph.prioritieSum < lowestWeight &&
          currentExitPath[currentExitPath.length - 1] === exitNode
        ) {
          lowestWeight = graph.prioritieSum;
          shortestExitPath = currentExitPath;
          lowestPriorities = R.clone(graph.priorities);
        }
      }

      const combinedVerteces = shortestExitPath.reduce(
        (prevValue, path) => [
          ...prevValue,
          { priority: lowestPriorities[path], path }
        ],
        []
      );

      /* Validate, if there is no exit */
      const hasNoPath = R.not(
        exitNodes.find(
          exitNode => exitNode === shortestExitPath[shortestExitPath.length - 1]
        )
      );
      if (hasNoPath) {
        toast.error("No exits found!");
        return state;
      }

      /* Get all steps and directions to the exit node */
      const { instructions, directions } = getInstruction(
        combinedVerteces,
        { path: human.position, direction: human.name.name },
        rowLength
      );

      toast.success("Your maze has been drawn!");

      return R.mergeDeepRight(initialState, {
        textareaValue: state.textareaValue,
        colLength,
        rowLength,
        maze,
        human,
        shortestExitPath,
        instructions,
        directions,
        step: 0
      });
    }
    case MAKE_STEP: {
      /* Is index of current step of shortestExitPath array */
      const shortestPathStep = state.shortestPathStep;
      const shortestExitPath = state.shortestExitPath;

      const rowLength = state.rowLength;

      const currentNode = Number(shortestExitPath[shortestPathStep]);
      const nextNode = Number(shortestExitPath[shortestPathStep + 1]);

      const human = state.human;
      const nextMaze = state.maze;

      const nextDirection = getRotateDirection(
        currentNode,
        nextNode,
        state.rowLength
      );

      let changedState = {};

      /* Set textarea value */
      let splittedTextarea = state.textareaValue.split("\n");
      const { col, row } = getMatrixCoords(currentNode, rowLength);

      /* human.name is the direction object with the name property -> top | left ... */
      if (nextDirection === human.name.name) {
        const nextShortestPathStep = action.payload + state.shortestPathStep;

        /* Change human position in maze */
        nextMaze[currentNode] = MAZE_SHAPES.SPACE;
        nextMaze[shortestExitPath[nextShortestPathStep]] = human.shape;

        /* Set textarea value */
        splittedTextarea[col] = replaceAt(
          splittedTextarea[col],
          row,
          MAZE_SHAPES.SPACE
        );
        const { col: nextCol, row: nextRow } = getMatrixCoords(
          shortestExitPath[nextShortestPathStep],
          rowLength
        );
        splittedTextarea[nextCol] = replaceAt(
          splittedTextarea[nextCol],
          nextRow,
          human.shape
        );

        changedState = {
          shortestPathStep: nextShortestPathStep,
          maze: [...nextMaze],
          human: {
            ...human,
            position: shortestExitPath[nextShortestPathStep]
          }
        };
      } else {
        /* Get next deg */
        const nextRotationDeg = getRotationDeg(human.rotation, action.payload);

        /* Get direction meta like shape, rotation ... */
        const directionMeta = MAZE_SHAPES.HUMAN_DIRECTION.find(
          direction => direction.rotation === nextRotationDeg
        );

        /* Change rotation in maze */
        nextMaze[currentNode] = directionMeta.shape;

        /* Set textarea value */
        splittedTextarea[col] = replaceAt(
          splittedTextarea[col],
          row,
          directionMeta.shape
        );

        changedState = {
          maze: nextMaze,
          human: {
            ...directionMeta,
            position: human.position
          }
        };
      }
      return R.mergeDeepRight(state, {
        ...changedState,
        step: state.step + 1,
        textareaValue: splittedTextarea.join("\n")
      });
    }
    case SET_TEXTAREA: {
      return R.mergeDeepRight(state, { textareaValue: action.payload });
    }

    default: {
      return state;
    }
  }
};
