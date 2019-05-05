import * as R from "ramda";

import { SET_MAZE } from "./constants";
import { MAZE_SHAPES, DIRECTION } from "../constants";
import { splitByNewLine, Graph } from "../../utils";
import { getDirectionMeta } from "../utils";
import { vertexDirections } from "./utils";

export const initialState = {
  rowLength: 0,
  colLength: 0,
  maze: [],
  human: {
    direction: "",
    position: 0
  },
  exitPaths: [],
  shortestPath: null
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

            //Check if it is a tree
            if (maze[vertexIndex] !== TREE || !hasDirection) {
              //Check if it is not a border element
              if (hasDirection) {
                connectedVertices = R.assoc(
                  vertexIndex.toString(),
                  1,
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
          }
          graph.addVertex(index, connectedVertices);
        }
        if (isHuman) {
          human = R.clone(isHuman);
          human.position = index;
          human.direction = vertex;
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

      let exitPaths = [];
      for (const exitNode of exitNodes) {
        exitPaths = R.append(
          graph
            .shortestPath(human.position.toString(), exitNode)
            .concat([human.position.toString()])
            .reverse(),
          exitPaths
        );
      }

      console.log(graph, exitNodes, exitPaths);

      const shortestPath = exitPaths.reduce(
        (prevValue, arr) => Math.min(prevValue, arr.length),
        Infinity
      );

      return R.mergeDeepRight(state, {
        colLength,
        rowLength,
        maze,
        human,
        exitPaths,
        shortestPath
      });
    }

    default: {
      return state;
    }
  }
};
