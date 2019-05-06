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
  for (let i = 0; i < combinedVerteces.length; i++) {
    let vertex = combinedVerteces[i];
    const nextVertex = combinedVerteces[i + 1];

    if (i === 0)
      combinedVerteces[i].priority =
        combinedVerteces[i].priority[nextVertex.index];

    const currentPriority = vertex.priority;

    if (!nextVertex) {
      const nextDirection = getRotateDirection(
        combinedVerteces[i - 1].index,
        vertex.index,
        rowLength
      );

      const rotation = getRotation(currentDirection, nextDirection);
      instructions = [...instructions, rotation, 1];
      break;
    }

    const nextDirection = getRotateDirection(
      vertex.index,
      nextVertex.index,
      rowLength
    );

    let nextStep = getNextStep(i);
    let currentInstruction = [];
    nextStep = nextStep === -1 ? combinedVerteces.length - i : nextStep;

    if (currentPriority === 3) {
      currentInstruction = [turnLeft, turnLeft, nextStep - i];
    } else if (currentPriority === 2) {
      const rotation = getRotation(currentDirection, nextDirection);

      if (instructions.length) {
        instructions[instructions.length - 1] += 1;
      }

      currentInstruction = [rotation, nextStep];
    } else if (currentPriority === 1) {
      currentInstruction = [nextStep];
    }

    if (i === 0) currentInstruction[currentInstruction.length - 1] -= 1;

    instructions = [...instructions, ...currentInstruction];
    i = nextStep + i;

    currentDirection = nextDirection;
  }
  return instructions;
};
