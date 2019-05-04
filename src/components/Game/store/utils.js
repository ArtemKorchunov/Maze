export const vertexDirections = [
  //Top
  {
    getConnectedIndex(index, rowLength) {
      return index - rowLength;
    },
    hasDirection(index, rowLength) {
      return index > 0;
    }
  },
  //Right
  {
    getConnectedIndex(index, rowLength) {
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
    getConnectedIndex(index, rowLength) {
      return index - 1;
    },
    hasDirection(index, rowLength) {
      return (index + 1) % rowLength !== 0;
    }
  }
];
