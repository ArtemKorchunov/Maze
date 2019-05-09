import React, { useRef, useEffect } from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import { rotatePoint, getCoordsOriginWithOffset } from "./utils";
import Square from "./Square";
//TODO Add Prop types
const Human = ({
  x,
  y,
  rotation,
  bgColor,
  size,
  stroke,
  strokeWidth,
  line,
  imageUrl = "/human.svg",
  imageSpace = 0.7
}) => {
  const [image] = useImage(imageUrl);
  const imageEl = useRef(null);
  const offset = size * ((1 - imageSpace) / 2);
  //TODO Move to separate file logic with calculation of coordinates depending to deg
  const topLeft = { x: -size / 2, y: -size / 2 };
  const current = rotatePoint(topLeft, 0);
  const rotated = rotatePoint(topLeft, rotation);
  const dx = rotated.x - current.x,
    dy = rotated.y - current.y;

  const { x: originX, y: originY } = getCoordsOriginWithOffset(
    x,
    y,
    offset,
    rotation
  );

  const sizeBySpace = size * imageSpace;

  useEffect(() => {
    imageEl.current.rotate(rotation);
  }, [rotation]);

  return (
    <Group>
      <Square
        x={x}
        y={y}
        color={bgColor}
        size={size}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {line}
      <Image
        image={image}
        x={originX + dx}
        y={originY + dy}
        width={sizeBySpace}
        height={sizeBySpace}
        ref={imageEl}
      />
    </Group>
  );
};

export default Human;
