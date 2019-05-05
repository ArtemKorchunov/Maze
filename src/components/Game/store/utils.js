import { DIRECTION } from "../constants";
import { HORIZONTAL, VERTICAL } from "../constants";

export const vertexDirections = {
  //Top
  [DIRECTION.TOP.name]: {
    getConnectedIndex(index, rowLength) {
      return index - rowLength;
    },
    hasDirection(index) {
      return index > 0;
    }
  },
  //Right
  [DIRECTION.RIGHT.name]: {
    getConnectedIndex(index) {
      return index + 1;
    },
    hasDirection(index, rowLength) {
      return index % rowLength !== 0;
    }
  },
  //Bottom
  [DIRECTION.BOTTOM.name]: {
    getConnectedIndex(index, rowLength) {
      return index + rowLength;
    },
    hasDirection(index, rowLength, colLength) {
      return index < rowLength * colLength;
    }
  },
  //Left
  [DIRECTION.LEFT.name]: {
    getConnectedIndex(index) {
      return index - 1;
    },
    hasDirection(index, rowLength) {
      return (index + 1) % rowLength !== 0;
    }
  }
};

export const getDirectionGroup = (vertextIndex, connectedVertexIndex) => {
  return Math.abs(vertextIndex - connectedVertexIndex) === 1
    ? HORIZONTAL
    : VERTICAL;
};
