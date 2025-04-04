'use client';
import React, { useEffect } from 'react';
import { investmentActions } from '@/slices/investmentSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import CreateInvestmentModal from '@/components/CreateInvestmentModal';
import { getAllInvestmentsDispatch } from '@/actions/investmentAction';
import InvestmentItem from '@/components/InvestmentItem';
import { getLatestInvRoi } from '@/components/DashboardFirstSec';
import { formatNumber } from '@/utils/numberFormatter';
import { AnimatePresence, motion } from 'framer-motion';

export type InvestmentItemType = {
  _id: string;
  amount: number;
  activeDate: string;
  dateCreated: string;
  investmentState?: string;
  roi: number;
  maximumDrawdown: number;
  isActive?: boolean | string;
  payoutAvailable: any;
  investmentType: string;
  nextPayout: string;
  contractPeriod: string;
};

const page = () => {
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

  const dispatchFn = useAppDispatch();

  const { isOpen, investments } = useAppSelector((state) => state.investments);
  const { token, details } = useAppSelector((state) => state.investor);

  const depoitInvestment = () => {
    dispatchFn(investmentActions.toggleInvestmentModal(true));
    dispatchFn(investmentActions.setInvestmentType('buy'));
  };

  // useEffect(() => {
  //   dispatchFn(getAllInvestmentsDispatch(token, details.id));
  // }, []);

  return (
    <main className=" font-nunito w-full">
      <AnimatePresence>{isOpen && <CreateInvestmentModal />}</AnimatePresence>
      <section className=" rounded-br-lg rounded-bl-lg   flex w-full  flex-col  ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="flex-1  rounded-lg   grid grid-cols-3 xxl:grid-cols-2 sm:grid-cols-1  gap-[2rem]  "
        >
          {investments
            .slice()
            .reverse()
            .map((investment: InvestmentItemType) => (
              <InvestmentItem
                key={investment._id}
                _id={investment._id}
                activeDate={investment.activeDate}
                amount={investment.amount}
                dateCreated={investment.dateCreated}
                roi={getLatestInvRoi(investment)}
                maximumDrawdown={investment.maximumDrawdown}
                investmentType={investment.investmentType}
                investmentState={investment.investmentState}
                contractPeriod={investment.contractPeriod}
                payoutAvailable={
                  getLatestInvRoi(investment)
                    ? formatNumber(
                        Math.round(
                          (investment.amount * getLatestInvRoi(investment)) /
                            100
                        )
                      )
                    : 0
                }
                nextPayout={investment.nextPayout}
              />
            ))}
        </motion.div>
      </section>
    </main>
  );
};

export default page;
