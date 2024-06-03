'use client';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/customHook';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { PiKeyReturnFill } from 'react-icons/pi';
import { IoMdTrendingDown } from 'react-icons/io';
import { RiStackFill } from 'react-icons/ri';
import { HiCircleStack } from 'react-icons/hi2';
import { InvestmentItemType } from '@/app/dashboard/[portfolio]/invest/page';
import { formatNumber } from '@/utils/numberFormatter';
import formatDate from '@/utils/dateFormatter';

const DashboardFirstSec = () => {
  const { name } = useAppSelector((state) => state.investor.details);

  const investments = useAppSelector(
    (state) => state.investments.investments
  ).filter((inv: InvestmentItemType) => inv.investmentState === 'active');

  const getOverallInvestmentValue = () => {
    const investmentValue = investments

      .map((inv: InvestmentItemType) => {
        if (inv.roi === 0) {
          return inv.amount;
        } else {
          return (inv.amount * inv.roi) / 100 + inv.amount;
        }
      })
      .reduce((acc, cur) => acc + cur, 0);

    return investmentValue;
  };

  const avgRoi = () => {
    const avgVal = investments
      .map((inv: InvestmentItemType) => inv.roi)
      .reduce((acc, cur) => acc + cur, 0);
    // return avgVal;
    return Math.round(avgVal / investments.length);
  };

  const getLatestInvestment = (): InvestmentItemType => {
    const inv = investments
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      )[0];

    return inv;
  };

  const latestInv = getLatestInvestment();

  const shareholderPortfolioData = [
    {
      title: 'Investment value',
      value: `$ ${formatNumber(getOverallInvestmentValue())}`,
      icon: (
        <MdAccountBalanceWallet className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
    },
    {
      title: 'Roi',
      value: `${avgRoi()} %`,
      icon: (
        <PiKeyReturnFill className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
    },
    // {
    //   title: 'Maximum drawdown',
    //   valueInUsd: '',
    //   valueInPercent: '20.00',
    //   valueInToken: '',
    //   icon: (
    //     <IoMdTrendingDown className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
    //   ),
    // },
    {
      title: 'Next Payout',
      icon: (
        <RiStackFill className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
      value:
        investments.length <= 0
          ? 'No Active Investment'
          : formatDate(latestInv.nextPayout),
    },
    {
      title: 'Payout available',
      icon: (
        <HiCircleStack className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
      value: `$ ${formatNumber((latestInv.amount * latestInv.roi) / 100)}`,
    },
  ];

  return (
    <div className=" bg-color-secondary-1 p-[2rem] rounded-lg font-nunito">
      <div className="mb-[1.5rem]">
        <p className="text-[3rem] font-semibold text-color-primary-1">
          Welcome {name.split(' ')[0]},
        </p>
      </div>
      <div className="grid grid-cols-4 gap-x-[2rem] font-nunito justify-betwee font-bold  rounded-lg w-full">
        {shareholderPortfolioData.map((item, i: number) => (
          <div
            key={i}
            className=" h-auto rounded-md flex    flex-col items-center  text-center  bg-[#161616] px-[1rem] py-[2rem] shadow-md  text-color-secondary-1 text-[1.7rem] font-bold "
          >
            <div className="flex flex-col items-center  mb-[.5rem]">
              <div className=" text-color-primary-1 mb-[1rem]">
                {item?.icon}
              </div>
              <p className="text-[1.8rem] font-semibold text-color-primary-1 uppercase mb-[1rem]">
                {item.title}
              </p>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardFirstSec;
