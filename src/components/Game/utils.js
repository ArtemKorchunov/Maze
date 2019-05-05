import { MAZE_SHAPES } from "./constants";

export const getDirectionMeta = shape =>
  MAZE_SHAPES.HUMAN_DIRECTION.find(direction => direction.shape === shape);
