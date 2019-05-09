import * as R from "ramda";

import { SET_MAZE, MAKE_STEP } from "./constants";
import { MAZE_SHAPES, DIRECTION } from "../constants";
import { splitByNewLine, Graph, isInteger } from "../../utils";
import { getDirectionMeta } from "../utils";
import {
  vertexDirections,
  getInstruction,
  getRotateDirection,
  getRotationDeg
} from "./utils";

export const initialState = {
  rowLength: 0,
  colLength: 0,
  maze: [],
  human: {
    shape: "",
    position: 0
  },
  shortestExitPath: null,
  shortestPathStep: 0,
  instructions: [],
  step: 0
};

const { TREE, SPACE } = MAZE_SHAPES;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_MAZE: {
      const splitedArr = splitByNewLine(action.payload);

      const colLength = splitedArr.length;
      const maze = R.compose(
        R.split(""),
        R.join("")
      )(splitedArr);
      const rowLength = maze.length / colLength;

      if (R.not(isInteger(rowLength))) return state;

      const graph = new Graph();

      let exitNodes = [];
      let human = R.clone(state.human);
      let humanKeysByDirection = {};

      for (let index = 0; index < maze.length; index++) {
        const vertex = maze[index];
        const isHuman = getDirectionMeta(vertex);

        let connectedVertices = {};

        if (vertex === SPACE || isHuman) {
          for (const directionKey of Object.keys(vertexDirections)) {
            const direction = vertexDirections[directionKey];

            const vertexIndex = direction.getConnectedIndex(index, rowLength);
            const hasDirection = direction.hasDirection(
              vertexIndex,
              rowLength,
              colLength
            );
            if (maze[vertexIndex] === TREE && hasDirection) continue;
            //Check if it is not a border element
            if (hasDirection) {
              connectedVertices = R.assoc(
                vertexIndex.toString(),
                0,
                connectedVertices
              );
            } else {
              //if it is border element that is " " it could be an exit
              exitNodes = R.append(index.toString(), exitNodes);
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
      for (const key of Object.keys(DIRECTION)) {
        const { name, index } = DIRECTION[key];

        const humanPosition = human.position;
        const currentWeight = human.weight[index];
        const connectedVertexIndex = humanKeysByDirection[name];
        if (!connectedVertexIndex) continue;

        graph.vertices[connectedVertexIndex][humanPosition] = currentWeight;

        graph.vertices[humanPosition][connectedVertexIndex] = currentWeight;
      }

      let shortestExitPath;
      let lowestWeight = Infinity;
      let lowestPriorities = null;

      for (const exitNode of exitNodes) {
        const currentExitPath = graph
          .shortestPath(human.position.toString(), exitNode)
          .concat([human.position.toString()])
          .reverse();
        if (graph.alt < lowestWeight) {
          lowestWeight = graph.alt;
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
      const instructions = getInstruction(
        combinedVerteces,
        { path: human.position, direction: human.name.name },
        rowLength
      );
      console.log(instructions);
      console.log(combinedVerteces);
      return R.mergeDeepRight(state, {
        colLength,
        rowLength,
        maze,
        human,
        shortestExitPath,
        instructions,
        step: 0
      });
    }
    case MAKE_STEP: {
      const shortestPathStep = state.shortestPathStep;
      const shortestExitPath = state.shortestExitPath;
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
      if (nextDirection === human.name.name) {
        const nextShortestPathStep = action.payload + state.shortestPathStep;

        nextMaze[currentNode] = MAZE_SHAPES.SPACE;
        nextMaze[shortestExitPath[nextShortestPathStep]] = human.shape;

        changedState = {
          shortestPathStep: nextShortestPathStep,
          maze: nextMaze
        };
      } else {
        const nextRotationDeg = getRotationDeg(human.rotation, action.payload);

        const directionMeta = MAZE_SHAPES.HUMAN_DIRECTION.find(
          direction => direction.rotation === nextRotationDeg
        );
        nextMaze[currentNode] = directionMeta.shape;
        changedState = {
          maze: nextMaze,
          human: {
            ...directionMeta,
            position: human.position
          }
        };
      }

      return R.mergeDeepRight(state, { ...changedState, step: state.step + 1 });
    }

    default: {
      return state;
    }
  }
};
