'use client';
import React, { useState } from 'react';
import { InvestmentItemType } from '@/app/dashboard/[portfolio]/invest/page';
import { motion } from 'framer-motion';
import formatDate from '@/utils/dateFormatter';
import { formatNumber } from '@/utils/numberFormatter';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { investmentActions } from '@/slices/investmentSlice';
import { makeWithdrawalRequestDispatch } from '@/actions/investmentAction';
import { FallingLines } from 'react-loader-spinner';
import { dateDiffInDays } from '@/utils/helperFns';

const InvestmentItem = ({
  _id,
  amount,
  dateCreated,
  roi,
  maximumDrawdown,
  investmentState,
  payoutAvailable,
  nextPayout,
}: InvestmentItemType) => {
  const dispatchFn = useAppDispatch();

  const [isAnimateScrollUp, setisAnimateScrollUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token, details } = useAppSelector((state) => state.investor);

  const data = [
    {
      text: 'capital',
      val: `$ ${formatNumber(amount)}`,
    },
    {
      text: 'roi',
      val: `${roi ? roi : 0} %`,
    },
    {
      text: 'max drawdown',
      val: `${maximumDrawdown} %`,
    },
    {
      text: 'payout available',
      val: `$ ${payoutAvailable}`,
    },
    {
      text: 'next payout',
      val: `${formatDate(nextPayout)}`,
    },
  ];

  const withdrawInvestmentHandler = () => {
    dispatchFn(
      makeWithdrawalRequestDispatch(token, details.id, _id, setIsLoading)
    );
  };

  const btnText = dateDiffInDays(
    new Date(data[4].val).getTime(),
    new Date().getTime()
  );

  return (
    <div
      className={`border border-color-primary-1 w-full h-[45rem]  rounded-lg overflow-hidden bg-color-primary-1 text-color-primary-3 flex flex-col justify-between pb-[2rem] relative`}
      onMouseOver={() => {
        setisAnimateScrollUp(true);
      }}
      onMouseLeave={() => {
        setisAnimateScrollUp(false);
      }}
    >
      <motion.div
        layout
        transition={{ duration: 0.3, ease: 'easeIn' }}
        className={`w-full bg-gradient-to-br from-color-primary-1 to-color-black bg-cover bg-no-repeat bg-center p-[2rem] absolute top-0 bottom-0 left-0 right-0 z-30 ${
          isAnimateScrollUp ? 'h-[15rem]' : 'h-full'
        }  bg-color-tertiary-1 rounded-bl-lg rounded-br-lg`}
      >
        <motion.p layout>{formatDate(dateCreated)}</motion.p>
        <motion.p layout>{investmentState}</motion.p>
      </motion.div>
      <div className={`px-[2rem] mt-[17rem] flex flex-wrap  justify-between`}>
        {data.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-color-primary-3 p-[.5rem] w-[45%] last:w-full text-[1.3rem] mb-[1rem]"
          >
            <p className="text-color-secondary-1 capitalize mb-[0.3rem]">
              {item.text}
            </p>
            <p>{item.val}</p>
          </div>
        ))}
      </div>
      <button
        disabled={btnText > 0}
        className="py-[1rem] w-[90%] text-center rounded-lg flex items-center justify-center self-center bg-color-primary-3 text-color-primary-1 font-semibold disabled:bg-[#dee2e6] disabled:text-[#868e96] disabled:cursor-not-allowed "
        onClick={withdrawInvestmentHandler}
      >
        {isLoading ? (
          <FallingLines
            height="25"
            width="25"
            color={'rgba(67, 104, 80)'}
            visible={true}
          />
        ) : (
          'Request Withdrawal'
        )}
      </button>
    </div>
  );
};

export default InvestmentItem;
