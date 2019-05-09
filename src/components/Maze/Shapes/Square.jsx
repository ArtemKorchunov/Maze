import React from "react";
import { Rect, Group } from "react-konva";

const RectShape = ({ size, color, line, stroke = "#fff", x, y }) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill={color}
        stroke={stroke}
        strokeWidth={1}
      />
      {line}
    </Group>
  );
};

export default RectShape;
