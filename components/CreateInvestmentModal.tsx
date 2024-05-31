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

const CreateInvestmentModal = () => {
  const dispatchFn = useAppDispatch();

  const investmentType = useAppSelector(
    (state: any) => state.investments.investmentType
  );

  const closeInvestmentModal = (e: any) => {
    if (e.target.dataset.close) {
      dispatchFn(investmentActions.toggleInvestmentModal());
      dispatchFn(investmentActions.setInvestmentType(''));
    }
  };

  return (
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-color-light-black cursor-pointer z-40"
      onClick={closeInvestmentModal}
      data-close="true"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`bg-[#BACD92]  flex font-nunito w-[60%] h-[80vh] ${
          investmentType === 'buy' ? 'sm:h-[80vh]' : 'sm:h-auto'
        }  xlg:w-[70%] lg:w-[80%] md:w-[90%] rounded-lg overflow-hidden`}
      >
        <div className="bg-order-bg bg-no-repeat bg-center bg-cover p-[2rem] w-[30rem] smd:hidden"></div>
        <div className="overflow-y-auto w-full">
          <p className="w-full py-[2rem] px-[1rem] text-[2rem] border border-color-light-black text-color-primary-1 font-bold uppercase">
            Create {investmentType === 'buy' ? 'an investment' : 'Sell'}
          </p>
          {investmentType === 'buy' ? <DepositInvestmentModal /> : <>/</>}
        </div>
      </motion.div>
    </div>
  );
};

export default CreateInvestmentModal;
