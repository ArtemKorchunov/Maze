import { DIRECTION, HORIZONTAL, VERTICAL } from "../../../Game/constants";

const {
  TOP: { name: TOP },
  LEFT: { name: LEFT },
  RIGHT: { name: RIGHT },
  BOTTOM: { name: BOTTOM }
} = DIRECTION;

export const getDirectionPoints = (x, y, size, direction) => {
  const halfSize = size / 2;
  const points = {
    [TOP]: [x + halfSize, y],
    [LEFT]: [x, y + halfSize],
    [BOTTOM]: [x + halfSize, y + size],
    [RIGHT]: [x + size, y + halfSize],
    middle: [x + halfSize, y + halfSize]
  };

  if (direction === HORIZONTAL) {
    return [...points[LEFT], ...points[RIGHT]];
  } else if (direction === VERTICAL) {
    return [...points[TOP], ...points[BOTTOM]];
  } else if (direction.from && direction.to) {
    return [
      ...points[direction.from],
      ...points.middle,
      ...points[direction.to]
    ];
  }
  return [];
};
