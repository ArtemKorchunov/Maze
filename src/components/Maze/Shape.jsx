import React from "react";
import PropTypes from "prop-types";

import { MAZE_SHAPES } from "../Game/constants";
import { Square, Human, Line } from "./Shapes";

import { getDirectionMeta } from "../Game/utils";

const { TREE, SPACE } = MAZE_SHAPES;

const Shape = ({
  node,
  x,
  y,
  size,
  colors,
  stroke,
  strokeWidth,
  direction
}) => {
  let properties = {};
  let ShapeComponent = null;

  if (node === TREE || node === SPACE) {
    properties = { x, y, size, color: colors[node], stroke, strokeWidth };
    ShapeComponent = Square;
  } else {
    const { rotation } = getDirectionMeta(node);
    properties = {
      x,
      y,
      size,
      bgColor: colors.HUMAN_BG,
      stroke,
      strokeWidth,
      rotation
    };
    ShapeComponent = Human;
  }

  return (
    <ShapeComponent
      {...properties}
      line={<Line x={x} y={y} size={size} direction={direction} />}
    />
  );
};

Shape.propTypes = {
  node: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  colors: PropTypes.object.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  direction: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

Shape.defaultProps = {
  direction: null
};
export default Shape;
