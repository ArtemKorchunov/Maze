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
  console.log(nextStep - step);
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

export const getRotationDeg = (prevDeg, rotation) => {
  let nextDeg = 0;
  if (rotation === turnLeft) {
    nextDeg = prevDeg === 0 ? 270 : prevDeg - 90;
  } else {
    nextDeg = prevDeg === 270 ? 0 : prevDeg + 90;
  }
  return nextDeg;
};

export const getRotation = (direction, nextDirection) => {
  if (
    (direction === RIGHT && nextDirection === TOP) ||
    (direction === TOP && nextDirection === LEFT) ||
    (direction === LEFT && nextDirection === BOTTOM) ||
    (direction === BOTTOM && nextDirection === RIGHT)
  ) {
    return turnLeft;
  }
  return turnRight;
};

export const getFirstVertexInstruction = (
  combinedVerteces,
  humanDirection,
  nextDirection
) => {
  let secondVertexIndex = combinedVerteces
    .slice(1)
    .findIndex(vertex => vertex.priority !== 0);

  secondVertexIndex = secondVertexIndex === -1 ? 0 : secondVertexIndex;

  const currentVertex = combinedVerteces[0];
  const secondVertex = combinedVerteces[1];

  const currentPriority = currentVertex.priority[secondVertex.path];

  if (currentPriority === 3) {
    return [turnLeft, turnLeft, secondVertexIndex];
  } else if (currentPriority === 2) {
    const rotation = getRotation(humanDirection, nextDirection);

    return [rotation, secondVertexIndex];
  } else if (currentPriority === 1) {
    return [secondVertexIndex];
  }
};

export const getInstruction = (combinedVerteces, human, rowLength) => {
  let currentDirection = getRotateDirection(
    combinedVerteces[0].path,
    combinedVerteces[1].path,
    rowLength
  );

  let instructions = getFirstVertexInstruction(
    combinedVerteces,
    human.direction,
    currentDirection
  );

  const nextVertexIndex = instructions[instructions.length - 1];

  for (let i = nextVertexIndex; i < combinedVerteces.length - 1; i++) {
    const { priority: currentPriority, path: currentPath } = combinedVerteces[
      i
    ];
    const { priority: nextPriority, path: nextPath } = combinedVerteces[i + 1];

    const lastChildIndex = instructions.length - 1;

    const nextDirection = getRotateDirection(currentPath, nextPath, rowLength);

    if (currentPriority === 0 && nextPriority === 0) {
      instructions[lastChildIndex] += 1;
      continue;
    }

    if (i !== nextVertexIndex) instructions[lastChildIndex] += 1;

    if (
      (currentPriority === 0 && nextPriority === 2) ||
      (currentPriority === 2 && nextPriority === 2)
    ) {
      const rotation = getRotation(currentDirection, nextDirection);
      instructions = [...instructions, rotation, 0];
    }

    currentDirection = nextDirection;
  }
  instructions[instructions.length - 1] += 1;
  return instructions;
};
