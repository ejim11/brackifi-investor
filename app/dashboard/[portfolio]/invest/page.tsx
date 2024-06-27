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
  nextPayout: string;
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

  useEffect(() => {
    dispatchFn(getAllInvestmentsDispatch(token, details.id));
  }, []);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full">
      <AnimatePresence>{isOpen && <CreateInvestmentModal />}</AnimatePresence>
      <section className="bg-order-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] sm:pt-[10rem] px-[5rem] flex pb-[5rem] w-full  flex-col h-screen xl:px-[3rem] sm:px-[1.5rem]">
        <div className="w-full flex justify-end ">
          <div className="bg-color-primary-3  w-auto flex rounded-lg overflow-hidden ">
            <p className="bg-color-primary-1 text-color-primary-3 px-[1.5rem] invest-text-clip flex items-center justify-center">
              Manage Investments
            </p>
            <div className="flex items-center  ">
              <button
                className=" py-[1rem]  text-center px-[2rem] capitalize font-semibold hover:text-color-secondary-2 duration-100 ease-in transition-all"
                onClick={depoitInvestment}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="flex-1 bg-color-secondary-3 mt-[2rem] rounded-lg overflow-auto  p-[3rem] xl:p-[1.5rem] xmd:p-[2rem]  grid grid-cols-4 xlg:grid-cols-3 xmd:grid-cols-2 sm:grid-cols-1 gap-[2rem]  "
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
                investmentState={investment.investmentState}
                payoutAvailable={
                  getLatestInvRoi(investment)
                    ? formatNumber(
                        Math.round(
                          (investment.amount * getLatestInvRoi(investment)) /
                            100 +
                            investment.amount
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
