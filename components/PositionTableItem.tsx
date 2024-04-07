'use client';
import React from 'react';

const PositionTableItem = ({
  index,
  asset,
  position,
  returns,
}: {
  index: number;
  asset: string;
  position: string;
  returns: string;
}) => {
  return (
    <tr className="text-center border-b border-color-tertiary-1 flex my-[1rem] bg-color-red">
      <td className="text-center py-[1rem] task-item">{index}</td>
      <td className="text-center py-[1rem]">{asset}</td>
      <td className="text-center py-[1rem]">{position}</td>
      <td className="text-center py-[1rem]">{returns}</td>
    </tr>
  );
};

export default PositionTableItem;
