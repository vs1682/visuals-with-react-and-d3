import React from 'react';

const Ribbon = ({
  startPoint,
  cp1,
  cp2,
  endPoint,
  width,
  fill,
  opacity,
  zIndex,
}) => {
  const sp = startPoint;
  const ep = endPoint;
  const styles = {
    fill,
    opacity,
    zIndex
  };

  return (
    <g>
      <path
        d={`
          M${sp.x}, ${sp.y}
          C${cp1.x}, ${cp1.y - width/2}, ${cp2.x}, ${cp2.y - width/2}, ${ep.x}, ${ep.y}
          C${cp2.x}, ${cp2.y + width/2}, ${cp1.x}, ${cp1.y + width/2}, ${sp.x}, ${sp.y}
        `}
        style={styles}
      />
    </g>
  );
}

export default Ribbon;