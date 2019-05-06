import React from "react";
import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";

import Shape from "./Shape";

const Maze = ({ rowLength, colLength, rectSize, rectColors, maze }) => {
  return (
    <Stage width={rowLength * rectSize} height={colLength * rectSize}>
      <Layer>
        {maze.map((node, index) => (
          <Shape
            key={`rect-${index}-${node}`}
            x={(index % rowLength) * rectSize}
            y={Math.floor(index / rowLength) * rectSize}
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
  rectSize: PropTypes.number.isRequired
};

export default React.memo(Maze);
