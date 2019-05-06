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

export const getRotateDirection = (step, nextStep, rowLength) => {
  switch (nextStep - step) {
    case 1:
      return DIRECTION.RIGHT.name;
    case -1:
      return DIRECTION.LEFT.name;
    case rowLength:
      return DIRECTION.BOTTOM.name;
    case -rowLength:
      return DIRECTION.TOP.name;
    default:
      throw new Error("Something went wrong");
  }
};

const {
  RIGHT: { name: RIGHT },
  LEFT: { name: LEFT },
  TOP: { name: TOP },
  BOTTOM: { name: BOTTOM }
} = DIRECTION;

const turnLeft = DIRECTION.LEFT.name;
const turnRight = DIRECTION.RIGHT.name;

//TODO Rewrite with simple if
export const getRotation = (direction, nextDirection) => {
  switch (true) {
    case direction === RIGHT && nextDirection === TOP:
    case direction === TOP && nextDirection === LEFT:
    case direction === LEFT && nextDirection === BOTTOM:
    case direction === BOTTOM && nextDirection === RIGHT:
      return turnLeft;
    default:
      return turnRight;
  }
};

export const getInstruction = (combinedVerteces, human, rowLength) => {
  let instructions = [];

  let currentDirection = human.direction;

  const getNextStep = i =>
    combinedVerteces.slice(i + 1).findIndex(vertex => vertex.priority !== 0);
  for (let i = 0; i < combinedVerteces.length - 1; i++) {
    const vertex = combinedVerteces[i];
    const nextVertex = combinedVerteces[i + 1];

    const currentPriority = vertex.priority;

    const nextDirection = getRotateDirection(
      vertex.index,
      nextVertex.index,
      rowLength
    );

    let nextStep = getNextStep(i);
    if (nextStep === -1) break;

    if (currentPriority === 3) {
      instructions.push([turnLeft, turnLeft, nextStep - i]);
    } else if (currentPriority === 2) {
      const rotation = getRotation(currentDirection, nextDirection);
      const previousInstruction = instructions[instructions.length - 1];
      if (previousInstruction.length === 2) previousInstruction[1] += 1;
      instructions.push([rotation, nextStep]);
    } else if (currentPriority === 1) {
      instructions.push([nextStep]);
    }
    i = nextStep + i;
    currentDirection = nextDirection;
  }
  return instructions;
};
