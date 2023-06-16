import React, { memo } from 'react';

type CellProp = {
  cellValue: string;
  position: number;
};

const Cell = memo(function ({ cellValue, position }: CellProp) {
  console.log('Rendering....', cellValue, position);

  return (
    <span
      className={`cell-player ${
        cellValue === 'X' ? 'yellow-letter' : 'red-letter'
      }`}
    >
      {cellValue}
    </span>
  );
});

export default Cell;
