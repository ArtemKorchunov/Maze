import React from "react";
import { Stage } from "react-konva";
import PropTypes from "prop-types";

const Maze = ({ rowLength, colLength, rectSize, rectColor }) => {
  return <Stage width={rowLength * rectSize} height={colLength * rectSize} />;
};

Maze.propTypes = {
  rowLength: PropTypes.number.isRequired,
  colLength: PropTypes.number.isRequired,
  rectSize: PropTypes.number.isRequired
};

export default Maze;
