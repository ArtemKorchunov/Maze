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
      throw new Error(
        `Something went wrong with step: ${step} nextStep:${nextStep} rowLength:${rowLength}`
      );
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
  /* Skip all steps forward */
  let secondVertexIndex = combinedVerteces
    .slice(1)
    .findIndex(vertex => vertex.priority !== 0);

  secondVertexIndex = secondVertexIndex === -1 ? 0 : secondVertexIndex;

  const currentVertex = combinedVerteces[0];
  const secondVertex = combinedVerteces[1];

  const currentPriority = currentVertex.priority[secondVertex.path];

  /* 3 priority means turn opposit side + 1 step forward */
  /* 2 priority means turning to 90 deg + 1 step forward */
  /* 1 priority means turn 1 step forward */

  if (currentPriority === 3) {
    return [turnLeft, turnLeft, secondVertexIndex];
  } else if (currentPriority === 2) {
    const rotation = getRotation(humanDirection, nextDirection);

    return [rotation, secondVertexIndex];
  } else if (currentPriority === 1) {
    return [secondVertexIndex];
  }
};

const oppositeDirection = direction => {
  switch (direction) {
    case TOP:
      return BOTTOM;
    case BOTTOM:
      return TOP;
    case LEFT:
      return RIGHT;
    case RIGHT:
      return LEFT;
    default:
      throw new Error(`Value is not available ${direction}`);
  }
};

export const getInstruction = (combinedVerteces, human, rowLength) => {
  let currentDirection = getRotateDirection(
    combinedVerteces[0].path,
    combinedVerteces[1].path,
    rowLength
  );

  /* Get first instruction separately because of specific weight value */
  let instructions = getFirstVertexInstruction(
    combinedVerteces,
    human.direction,
    currentDirection
  );

  /* Group -> Horizontal or vertical */
  const directionGroup = getDirectionGroup(
    combinedVerteces[0].path,
    combinedVerteces[1].path
  );

  const nextVertexIndex = instructions[instructions.length - 1];

  /* Is the line path that is drawn in canvas */
  let directions = {};
  for (let i = 0; i < nextVertexIndex; i++) {
    directions[combinedVerteces[i].path] = directionGroup;
  }

  const verticesLength = combinedVerteces.length;

  for (let i = nextVertexIndex; i < verticesLength - 1; i++) {
    const { priority: currentPriority, path: currentPath } = combinedVerteces[
      i
    ];
    const { priority: nextPriority, path: nextPath } = combinedVerteces[i + 1];
    const lastChildIndex = instructions.length - 1;
    const nextDirection = getRotateDirection(currentPath, nextPath, rowLength);

    /* Only for getting directions */
    if (currentDirection === nextDirection) {
      const directionGroup = getDirectionGroup(currentPath, nextPath);
      directions[currentPath] = directionGroup;
    } else {
      directions[currentPath] = {
        from: oppositeDirection(currentDirection),
        to: nextDirection
      };
    }

    /* 0 priority means step forward */
    if (currentPriority === 0 && nextPriority === 0) {
      instructions[lastChildIndex] += 1;
      continue;
    }

    if (i !== nextVertexIndex) instructions[lastChildIndex] += 1;

    /* 2 priority means turning to 90 deg + 1 step forward */
    if (
      (currentPriority === 0 && nextPriority === 2) ||
      (currentPriority === 2 && nextPriority === 2)
    ) {
      const rotation = getRotation(currentDirection, nextDirection);
      instructions = [...instructions, rotation, 0];
    }

    currentDirection = nextDirection;
  }

  /* Adding exit direction */
  const lastVertexPath = combinedVerteces[verticesLength - 1].path;
  const lastDiretiction = getDirectionGroup(
    lastVertexPath,
    combinedVerteces[verticesLength - 2].path
  );

  directions[lastVertexPath] = lastDiretiction;
  instructions[instructions.length - 1] += 1;

  return { instructions, directions };
};

export const getMatrixCoords = (cordNode, rowLength) => {
  return { row: cordNode % rowLength, col: Math.floor(cordNode / rowLength) };
};
