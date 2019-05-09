import React from "react";
import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";

import Shape from "./Shape";

const Maze = ({
  rowLength,
  colLength,
  rectSize,
  rectColors,
  maze,
  directions
}) => {
  return (
    <Stage width={rowLength * rectSize} height={colLength * rectSize}>
      <Layer>
        {maze.map((node, index) => (
          <Shape
            key={`rect-${index}-${node}`}
            x={(index % rowLength) * rectSize}
            y={Math.floor(index / rowLength) * rectSize}
            direction={directions[index]}
            size={rectSize}
            colors={rectColors}
            stroke={"#fff"}
            strokeWidth={1}
            node={node}
          />
        ))}
      </Layer>
    </Stage>
  );
};

Maze.propTypes = {
  rowLength: PropTypes.number.isRequired,
  colLength: PropTypes.number.isRequired,
  rectSize: PropTypes.number.isRequired,
  rectColors: PropTypes.object.isRequired,
  maze: PropTypes.array.isRequired,
  directions: PropTypes.object.isRequired
};

export default Maze;
