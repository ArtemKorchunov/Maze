import React from "react";

import { MAZE_SHAPES } from "../Game/constants";
import { Square, Human } from "./Shapes";

import { getDirectionMeta } from "../Game/utils";

const { TREE, SPACE } = MAZE_SHAPES;

const Shape = ({ node, x, y, size, colors, stroke, strokeWidth }) => {
  if (node === TREE || node === SPACE) {
    return (
      <Square
        x={x}
        y={y}
        size={size}
        color={colors[node]}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  }
  const { rotation } = getDirectionMeta(node);
  return (
    <Human
      rotation={rotation}
      x={x}
      y={y}
      size={size}
      bgColor={colors.HUMAN_BG}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

export default Shape;
