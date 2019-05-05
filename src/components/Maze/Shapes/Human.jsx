import React from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import Square from "./Square";

const Human = ({
  x,
  y,
  rotation,
  bgColor,
  size,
  stroke,
  strokeWidth,
  imageUrl = "/human.svg",
  imageSpace = 0.8
}) => {
  const [image] = useImage(imageUrl);
  console.log(image);
  const offset = size * ((1 - imageSpace) / 2);
  const sizeBySpace = size * imageSpace;

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
      <Image
        image={image}
        x={x + offset}
        y={y + offset}
        width={sizeBySpace}
        height={sizeBySpace}
      />
    </Group>
  );
};

export default Human;
