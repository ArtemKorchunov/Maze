import React from "react";
import { Rect } from "react-konva";

const RectShape = ({ size, color, stroke = "#fff", x, y }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill={color}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default RectShape;
