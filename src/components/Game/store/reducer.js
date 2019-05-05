import * as R from "ramda";

import { SET_MAZE } from "./constants";
import { MAZE_SHAPES } from "../constants";
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
  exitPaths: []
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
      const human = R.clone(state.human);

      for (let index = 0; index < maze.length; index++) {
        const vertex = maze[index];
        const isHuman = getDirectionMeta(vertex);

        let connectedVertices = {};
        if (vertex === SPACE || isHuman) {
          for (const direction of vertexDirections) {
            //Get connected vertex index
            const vertexIndex = direction.getConnectedIndex(index, rowLength);
            const hasDirection = direction.hasDirection(
              vertexIndex,
              rowLength,
              colLength
            );

            //TODO refactor hasDirection duplication
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
            }

            //Set human position
            if (isHuman) {
              human.position = index;
              human.direction = isHuman.shape;
            }

            //Add to graph
            graph.addVertex(index, connectedVertices);
          }
        }
      }

      let exitPaths = null;
      for (const exitNode of exitNodes) {
        exitPaths = R.append(
          graph
            .shortestPath(human.position.toString(), exitNode)
            .concat([human.position.toString()])
            .reverse(),
          exitPaths
        );
      }

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
