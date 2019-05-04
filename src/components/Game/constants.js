import { baseColor } from "../../constants";

export const rectSize = 30;

export const MAZE_SHAPES = {
  TREE: "#",
  SPACE: " ",
  HUMAN_DIRECTION: [
    { shape: "^" },
    { shape: "<" },
    { shape: ">" },
    { shape: "v" }
  ]
};

export const MAZE_COLORS = {
  [MAZE_SHAPES.TREE]: baseColor,
  [MAZE_SHAPES.SPACE]: "#e5e7ea"
};
