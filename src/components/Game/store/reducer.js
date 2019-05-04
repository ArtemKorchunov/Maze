import * as R from "ramda";

import { SET_MAZE } from "./constants";
import { MAZE_SHAPES } from "../constants";
import { splitByNewLine, Graph } from "../../utils";
import { vertexDirections } from "./utils";

export const initialState = {
  rowLength: 0,
  colLength: 0,
  maze: "",
  human: {
    direction: "",
    position: 0
  },
  exitPaths: []
};

const { TREE, SPACE, HUMAN_DIRECTION } = MAZE_SHAPES;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_MAZE: {
      const splitedArr = splitByNewLine(action.payload);

      const colLength = splitedArr.length;
      const maze = R.join("", splitedArr);
      const rowLength = maze.length / colLength;

      const graph = new Graph();

      let exitNodes = [];
      const human = R.clone(state.human);

      for (let index = 0; index < maze.length; index++) {
        const vertex = maze[index];
        const isHuman = HUMAN_DIRECTION.find(
          direction => direction.shape === vertex
        );

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
            //Check if it is a tree
            if (maze[vertexIndex] !== TREE) {
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
      for (const exitNode of exitNodes) {
        const paths = graph.shortestPath(human.position.toString(), exitNode);
        console.log(paths);
      }

      return R.mergeDeepRight(state, {
        colLength,
        rowLength,
        maze,
        human
      });
    }
    default: {
      return state;
    }
  }
};
