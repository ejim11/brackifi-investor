'use client';
import React from 'react';
import { investmentActions } from '@/slices/investmentSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import CreateInvestmentModal from '@/components/CreateInvestmentModal';

const page = () => {
  const dispatchFn = useAppDispatch();

  const isOpen = useAppSelector((state) => state.investments.isOpen);

  const depoitInvestment = () => {
    dispatchFn(investmentActions.toggleInvestmentModal());
    dispatchFn(investmentActions.setInvestmentType('buy'));
  };

  //   const withdrawInvestment = () => {
  //     dispatchFn(investmentActions.toggleInvestmentModal());
  //     dispatchFn(investmentActions.setInvestmentType('sell'));
  //   };

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
        <div className="flex-1 bg-color-secondary-3 mt-[2rem] rounded-lg overflow-auto"></div>
      </section>
    </main>
  );
};

export default page;
