'use client';
import React from 'react';
import { useAppSelector } from '@/hooks/customHook';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { PiKeyReturnFill } from 'react-icons/pi';
import { IoMdTrendingDown } from 'react-icons/io';
import { RiStackFill } from 'react-icons/ri';
import { HiCircleStack } from 'react-icons/hi2';

const shareholderPortfolioData = [
  {
    title: 'Share value',
    valueInUsd: '$20,000',
    valueInToken: '100,000',
    valueInPercent: '',
    icon: (
      <MdAccountBalanceWallet className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    ),
  },
  {
    title: 'Total Returns',
    valueInUsd: '$10,000',
    valueInPercent: '10.00',
    valueInToken: '',
    icon: (
      <PiKeyReturnFill className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    ),
  },
  {
    title: 'Maximum drawdown',
    valueInUsd: '',
    valueInPercent: '20.00',
    valueInToken: '',
    icon: (
      <IoMdTrendingDown className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    ),
  },
  {
    title: 'Token Valuation',
    icon: (
      <RiStackFill className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    ),
    text: '1BRAC = 100 USD',
  },
  {
    title: 'Tokens available',
    icon: (
      <HiCircleStack className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    ),
    text: '8,000,000 BRAC',
  },
];

const DashboardFirstSec = () => {
  const { name, id } = useAppSelector((state) => state.shareholder.details);
  return (
    <div className="flex flex-col font-nunito justify-between h-full font-bold">
      {shareholderPortfolioData.map((item, i) => (
        <div
          key={i}
          className="w-full h-auto rounded-md flex  flex-col mb-[1rem] bg-[#161616] p-[1rem]  text-color-secondary-2 text-[1.7rem] font-bold last:mb-0"
        >
          <div className="flex items-center  mb-[.5rem]">
            <div className=" text-color-primary-1 mr-[1rem]">{item?.icon}</div>
            <p className="text-[1.8rem] font-semibold text-color-primary-1 uppercase ">
              {item.title}
            </p>
          </div>
          {item.valueInToken && (
            <p>
              {item.valueInToken} BRAC ({item.valueInUsd})
            </p>
          )}
          {/* {item.valueInUsd && <p>{item.valueInUsd}</p>} */}
          {item.valueInPercent && (
            <p>
              {' '}
              {item.valueInUsd} ({item.valueInPercent}%)
            </p>
          )}
          {item.text && <p>{item.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default DashboardFirstSec;
