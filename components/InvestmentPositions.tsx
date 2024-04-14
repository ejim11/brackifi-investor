'use client';
import React from 'react';
import PositionTableItem from './PositionTableItem';

const tableHeaders = ['No', 'asset', 'position', 'returns'];

const positions = [
  {
    asset: 'BTC/USDC',
    position: 'LONG',
    returns: '10.00% ($230,000)',
  },
  {
    asset: 'BTC/USDC',
    position: 'LONG',
    returns: '10.00% ($230,000)',
  },
  {
    asset: 'BTC/USDC',
    position: 'LONG',
    returns: '10.00% ($230,000)',
  },
  {
    asset: 'BTC/USDC',
    position: 'LONG',
    returns: '10.00% ($230,000)',
  },
  {
    asset: 'BTC/USDC',
    position: 'LONG',
    returns: '10.00% ($230,000)',
  },
];

const InvestmentPositions = () => {
  return (
    <div className="w-full h-full  ">
      <table className="w-full  table-auto h-full " id="customers">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="py-[1rem]">
                <span className=" uppercase text-color-white text-center py-[1rem]">
                  {header}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {positions.map((position, i) => (
            <PositionTableItem
              asset={position.asset}
              returns={position.returns}
              position={position.position}
              index={i + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentPositions;
