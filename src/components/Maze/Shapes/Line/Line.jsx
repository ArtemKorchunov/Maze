import React from "react";
import { Line } from "react-konva";

import { yellowColor } from "../../../../constants";
import { getDirectionPoints } from "./utils";

const LineShape = ({ x, y, size, direction }) => {
  if (!direction) return null;

  const directionPoints = getDirectionPoints(x, y, size, direction);

  return (
    <Line
      points={directionPoints}
      stroke={yellowColor}
      strokeWidth={5}
      lineCap="round"
    />
  );
};

export default LineShape;
