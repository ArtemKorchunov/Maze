import React from "react";
import { Line } from "react-konva";
import PropTypes from "prop-types";

import { yellowColor } from "../../../../../constants";
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

LineShape.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  direction: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
export default LineShape;
