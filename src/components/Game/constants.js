import { baseColor } from "../../constants";

export const rectSize = 30;

export const DIRECTION = {
  TOP: {
    name: "top",
    index: 0
  },
  RIGHT: {
    name: "right",
    index: 1
  },
  BOTTOM: {
    name: "bottom",
    index: 2
  },
  LEFT: {
    name: "left",
    index: 3
  }
};

export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";

export const MAZE_SHAPES = {
  TREE: "#",
  SPACE: " ",
  HUMAN_DIRECTION: [
    //weight of connected vertex [0: Top, 1: Right, 2: Bottom, 3: Left]
    { shape: "^", rotation: 0, name: DIRECTION.TOP, weight: [1, 2, 3, 2] },
    {
      shape: ">",
      rotation: 90,
      name: DIRECTION.RIGHT,
      weight: [2, 1, 2, 3]
    },
    {
      shape: "v",
      rotation: 180,
      name: DIRECTION.BOTTOM,
      weight: [3, 2, 1, 2]
    },
    {
      shape: "<",
      rotation: 270,
      name: DIRECTION.LEFT,
      weight: [2, 3, 2, 1]
    }
  ]
};

export const MAZE_COLORS = {
  [MAZE_SHAPES.TREE]: baseColor,
  [MAZE_SHAPES.SPACE]: "#e5e7ea",
  HUMAN_BG: "#e5e7ea"
};
