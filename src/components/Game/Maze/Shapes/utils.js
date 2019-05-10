const degToRad = Math.PI / 180;

export const rotatePoint = ({ x, y }, deg) => {
  const rcos = Math.cos(deg * degToRad),
    rsin = Math.sin(deg * degToRad);
  return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

export const getCoordsOriginWithOffset = (x, y, offset, rotate) => {
  switch (rotate) {
    case 0:
      return {
        x: x + offset,
        y: y + offset
      };
    case 90:
      return {
        x: x - offset,
        y: y + offset
      };
    case 180:
      return {
        x: x - offset,
        y: y - offset
      };
    case 270:
      return {
        x: x + offset,
        y: y - offset
      };
    default:
      throw new Error(
        `Rotation is not mentioned x:${x} y:${y} offset: ${offset} rotate:${rotate}`
      );
  }
};
