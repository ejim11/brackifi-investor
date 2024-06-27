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
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      exit={{ opacity: 0, x: 300 }}
      className="flex justify-end w-full mt-[8rem] sm:mt-[7rem] items-center  fixed top-0 bottom-0 right-0 left-0 bg-color-black-light cursor-pointer z-40"
      onClick={closeInvestmentModal}
      data-close="true"
    >
      <motion.div
        className={`bg-[#BACD92]  flex font-nunito w-[30%] 2xl:w-[40%] xl:w-[50%]  h-full  xlg:w-[70%] lg:w-[80%] md:w-full rounded-tl-lg rounded-bl-lg md:rounded-none overflow-hidden`}
        data-keep="true"
      >
        <div className="overflow-y-auto w-full">
          <div className="py-[1.5rem] px-[1rem]  border-b border-color-light-black flex items-center justify-between">
            {investmentType && (
              <p className="w-full md:w-auto md:text-left text-center  text-[2rem]  text-color-primary-1 font-bold uppercase">
                Create {investmentType === 'buy' ? 'an investment' : 'Sell'}
              </p>
            )}

            <RxCross2
              className="md:block hidden w-[2.8rem] h-[2.8rem] text-color-primary-1"
              onClick={closeInvestmentModal}
              data-closer="true"
            />
          </div>

          {investmentType === 'buy' && <DepositInvestmentModal />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateInvestmentModal;
