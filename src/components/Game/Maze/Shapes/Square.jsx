import React from "react";
import { Rect, Group } from "react-konva";
import PropTypes from "prop-types";

const RectShape = ({ size, color, line, stroke, x, y }) => {
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

RectShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  line: PropTypes.node,
  stroke: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

RectShape.defaultProps = {
  stroke: "#fff",
  line: null
};

export default RectShape;
