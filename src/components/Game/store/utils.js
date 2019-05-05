import { Graph } from "../../utils";
import { DIRECTION } from "../constants";
export const vertexDirections = [
  //Top
  {
    getConnectedIndex(index, rowLength) {
      return index - rowLength;
    },
    hasDirection(index) {
      return index > 0;
    }
  },
  //Right
  {
    getConnectedIndex(index) {
      return index + 1;
    },
    hasDirection(index, rowLength) {
      return index % rowLength !== 0;
    }
  },
  //Bottom
  {
    getConnectedIndex(index, rowLength) {
      return index + rowLength;
    },
    hasDirection(index, rowLength, colLength) {
      return index < rowLength * colLength;
    }
  },
  //Left
  {
    getConnectedIndex(index) {
      return index - 1;
    },
    hasDirection(index, rowLength) {
      return (index + 1) % rowLength !== 0;
    }
  }
];

const graph = new Graph();

graph.addVertex("top", { left: 1, right: 1 });
graph.addVertex("left", { top: 1, bottom: 1 });
graph.addVertex("bottom", { left: 1, right: 1 });
graph.addVertex("right", { bottom: 1, top: 1 });
