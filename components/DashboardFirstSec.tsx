'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { PiKeyReturnFill } from 'react-icons/pi';
import { RiStackFill } from 'react-icons/ri';
import { HiCircleStack } from 'react-icons/hi2';
import { InvestmentItemType } from '@/app/dashboard/[portfolio]/invest/page';
import formatDate from '@/utils/dateFormatter';
import { dateDiffInDays } from '@/utils/helperFns';
import ShareParamsSlider from './ShareParamsSlider';
import modifyNum from '@/utils/modifyAmount';
import { easeIn, motion } from 'framer-motion';
import { getAllInvestmentsDispatch } from '@/actions/investmentAction';

// get the latest roi so we use it to calculate the payout available
export const getLatestInvRoi = (inv: any) => {
  let roi = inv.activeDate
    ? dateDiffInDays(new Date(inv.activeDate).getTime(), new Date().getTime()) *
      0.16
    : 0;

  // if the roi is greater than the choosen max drawdown for that particular inv then set the max drawdown as the roi
  if (roi >= inv.maximumDrawdown) {
    return inv.maximumDrawdown;
  }
  return Math.round(roi);
};

const DashboardFirstSec = () => {
  // dispatch function
  const dispatch = useAppDispatch();

  // states
  const { name, id } = useAppSelector((state) => state.investor.details);
  const { token } = useAppSelector((state) => state.investor);
  const investments = useAppSelector(
    (state) => state.investments.investments
  ).filter((inv: InvestmentItemType) => inv.investmentState === 'active');

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const itemVariant = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  const totalRoi = () => {
    let staticRoi = 0.16;
    const roi = investments
      .filter((inv: InvestmentItemType) => inv.investmentState === 'active')
      .map((inv: InvestmentItemType) => {
        const dateDiff = dateDiffInDays(
          new Date(inv.activeDate).getTime(),
          new Date().getTime()
        );

        const newRoi = dateDiff * staticRoi;
        if (newRoi >= inv.maximumDrawdown) {
          return inv.maximumDrawdown;
        }
        return newRoi;
      })
      .reduce((acc, cur) => acc + cur, 0);

    return roi.toFixed(2);
  };

  const getOverallInvestmentValue = () => {
    const investmentValue = investments
      .filter((inv: InvestmentItemType) => inv.investmentState === 'active')
      .map((inv: InvestmentItemType) => inv.amount)
      .reduce((acc, cur) => acc + cur, 0);

    return investmentValue;
  };

  const getLatestInvestment = (): InvestmentItemType => {
    const inv = investments
      .filter((inv: InvestmentItemType) => inv.investmentState === 'active')
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      )[0];

    return inv;
  };

  const latestInv = getLatestInvestment();

  const totalPayoutAvailable = investments
    .filter((inv: InvestmentItemType) => inv.investmentState === 'active')
    .map((inv: InvestmentItemType) =>
      Math.round((inv.amount * getLatestInvRoi(inv)) / 100)
    )
    .reduce((acc, cur) => acc + cur, 0);

  // console.log(totalPayoutAvailable);

  const investorPortfolioData = [
    {
      title: 'Investment Amount',
      value: `$ ${modifyNum(String(Math.round(getOverallInvestmentValue())))}`,
      icon: (
        <MdAccountBalanceWallet className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
    },
    {
      title: 'Total Roi',
      value: `${totalRoi()} %`,
      icon: (
        <PiKeyReturnFill className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
    },
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
      title: 'Total Payout available',
      icon: (
        <HiCircleStack className="w-[2.5rem] h-[2.5rem] text-color-curentColor" />
      ),
      value: `$ ${latestInv ? modifyNum(String(totalPayoutAvailable)) : 0}`,
    },
  ];

  useEffect(() => {
    dispatch(getAllInvestmentsDispatch(token, id));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeIn }}
      className=" font-nunito  font-bold bg-color-secondary-3  p-[2rem] rounded-lg w-full flex flex-col  xlg:flex-wrap"
    >
      <div className="mb-[1.5rem]">
        <p className="text-[3rem] sm:text-[2.5rem] font-semibold text-color-primary-1 capitalize">
          Welcome {name.split(' ')[0]},
        </p>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        className="grid grid-cols-4 xmd:grid-cols-2 gap-[2rem] font-nunito justify-between font-bold  rounded-lg w-full sm:hidden"
      >
        {investorPortfolioData.map((item, i: number) => (
          <motion.div
            variants={itemVariant}
            key={i}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className=" h-auto rounded-md flex    flex-col items-center  text-center  bg-[#161616] px-[1rem] py-[2rem] shadow-md  text-color-secondary-1 text-[1.7rem] font-bold"
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
          </motion.div>
        ))}
      </motion.div>
      <ShareParamsSlider shareParams={investorPortfolioData} />
    </motion.div>
  );
};

export default DashboardFirstSec;
