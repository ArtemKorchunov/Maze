import { baseColor } from "../../constants";

export const rectSize = 30;

export const DIRECTION = {
  TOP: "top",
  LEFT: "left",
  BOTTOM: "bottom",
  RIGHT: "RIGHT"
};

export const MAZE_SHAPES = {
  TREE: "#",
  SPACE: " ",
  HUMAN_DIRECTION: [
    { shape: "^", rotation: 0, name: DIRECTION.TOP },
    { shape: ">", rotation: 90, name: DIRECTION.RIGHT },
    { shape: "v", rotation: 180, name: DIRECTION.BOTTOM },
    { shape: "<", rotation: 270, name: DIRECTION.LEFT }
  ]
};

export const MAZE_COLORS = {
  [MAZE_SHAPES.TREE]: baseColor,
  [MAZE_SHAPES.SPACE]: "#e5e7ea",
  HUMAN_BG: "#e5e7ea"
};
