import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import PropTypes from "prop-types";

const Maze = ({ rowLength, colLength, rectSize, rectColors, maze }) => {
  return (
    <Stage width={rowLength * rectSize} height={colLength * rectSize}>
      <Layer>
        {maze.map((node, index) => (
          <Rect
            key={`rect-${index}-${node}`}
            x={(index % rowLength) * rectSize}
            y={Math.floor(index / rowLength) * rectSize}
            width={rectSize}
            height={rectSize}
            fill={rectColors[node]}
            stroke={"#fff"}
            strokeWidth={1}
          />
        ))}
      </Layer>
    </Stage>
  );
};

Maze.propTypes = {
  rowLength: PropTypes.number.isRequired,
  colLength: PropTypes.number.isRequired,
  rectSize: PropTypes.number.isRequired
};

export default Maze;
