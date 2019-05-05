import { baseColor } from "../../constants";

export const rectSize = 30;

export const MAZE_SHAPES = {
  TREE: "#",
  SPACE: " ",
  HUMAN_DIRECTION: [
    { shape: "^", rotation: 0 },
    { shape: ">", rotation: 90 },
    { shape: "v", rotation: 180 },
    { shape: "<", rotation: 270 }
  ]
};

export const MAZE_COLORS = {
  [MAZE_SHAPES.TREE]: baseColor,
  [MAZE_SHAPES.SPACE]: "#e5e7ea",
  HUMAN_BG: "#e5e7ea"
};
