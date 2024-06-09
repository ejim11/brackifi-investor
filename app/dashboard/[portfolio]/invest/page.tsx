'use client';
import React, { useEffect } from 'react';
import { investmentActions } from '@/slices/investmentSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import CreateInvestmentModal from '@/components/CreateInvestmentModal';
import { getAllInvestmentsDispatch } from '@/actions/investmentAction';
import InvestmentItem from '@/components/InvestmentItem';

export type InvestmentItemType = {
  _id: string;
  amount: number;
  activeDate: string;
  dateCreated: string;
  investmentState?: string;
  roi: number;
  maximumDrawdown: number;
  isActive?: boolean | string;
  payoutAvailable: number;
  nextPayout: string;
};

const page = () => {
  const dispatchFn = useAppDispatch();

  const { isOpen, investments } = useAppSelector((state) => state.investments);
  const { token, details } = useAppSelector((state) => state.investor);

  console.log(investments);

  const depoitInvestment = () => {
    dispatchFn(investmentActions.toggleInvestmentModal());
    dispatchFn(investmentActions.setInvestmentType('buy'));
  };

  useEffect(() => {
    dispatchFn(getAllInvestmentsDispatch(token, details.id));
  }, []);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full">
      {isOpen && <CreateInvestmentModal />}
      <section className="bg-order-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] px-[5rem] flex pb-[5rem] w-full  flex-col h-screen">
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
        <div className="flex-1 bg-color-secondary-3 mt-[2rem] rounded-lg overflow-auto  p-[3rem]  grid grid-cols-4 gap-[2rem] ">
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
                roi={investment.roi}
                maximumDrawdown={investment.maximumDrawdown}
                investmentState={investment.investmentState}
                payoutAvailable={investment.payoutAvailable}
                nextPayout={investment.nextPayout}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default page;
