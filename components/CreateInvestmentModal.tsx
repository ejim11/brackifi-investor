'use client';
import React from 'react';
import { useAppDispatch } from '@/hooks/customHook';
// import { ordersAction } from '@/slices/ordersSlice';
import { useAppSelector } from '@/hooks/customHook';
// import BuyOrderModal from './BuyOrderModal';
// import SellOrderModal from './SellOrderModal';
import { motion } from 'framer-motion';
import { investmentActions } from '@/slices/investmentSlice';
import DepositInvestmentModal from './DepositInvestmentModal';
import { RxCross2 } from 'react-icons/rx';

const CreateInvestmentModal = () => {
  const dispatchFn = useAppDispatch();

  const investmentType = useAppSelector(
    (state: any) => state.investments.investmentType
  );

  const closeInvestmentModal = (e: any) => {
    if (
      e.target.dataset.close === 'true' ||
      e.target.dataset.closer === 'true'
    ) {
      dispatchFn(investmentActions.toggleInvestmentModal(false));
      dispatchFn(investmentActions.setInvestmentType(''));
    }
  };

  return (
    <div className={`bg-color-secondary-3 flex font-nunito w-full `}>
      <div className="overflow-y-auto w-full">
        <div className="py-[1.5rem] px-[1rem]  border-b border-color-light-black flex items-center justify-between">
          <p className="w-full md:w-auto md:text-left text-center  text-[2rem]  text-color-primary-1 font-bold uppercase">
            Create Investment
          </p>
        </div>

        <DepositInvestmentModal />
      </div>
    </div>
  );
};

export default CreateInvestmentModal;
