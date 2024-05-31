'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from './InputComponent';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FallingLines } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
// import { createOrderAction } from '@/actions/ordersAction';
// import { ordersAction } from '@/slices/ordersSlice';

const DepositInvestmentForm = () => {
  const dispatchFn = useAppDispatch();

  const { sharevalue: perShareValue, token } = useAppSelector(
    (state: any) => state.shareholder
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  type FormData = {
    address: string;
    amountPaid: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      amountPaid: '',
    },
  });

  const resetForm = () => {
    reset({
      address: '',
      amountPaid: '',
    });
  };

  //   const closeOrderModal = (e: any) => {
  //     dispatchFn(ordersAction.toggleOrderModal());
  //     dispatchFn(ordersAction.setOrderType(''));
  //   };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const newData = {
    //   orderType: 'buy',
    //   walletAddress: data.address,
    //   amount: data.amountPaid,
    //   shareCost: perShareValue,
    // };
    // dispatchFn(
    //   createOrderAction(
    //     newData,
    //     token,
    //     resetForm,
    //     closeOrderModal,
    //     setIsLoading
    //   )
    // );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputComponent
        placeholder={process.env.NEXT_PUBLIC_PAYMENT_ADDRESS}
        type={'text'}
        label="Your Wallet Address"
        register={register}
        error={errors}
        name={'address'}
        pl="pl-[2rem]"
        validation={registrationOption.walletAddress}
        inputBg="bg-color-primary-2"
        labelTextColor="text-color-primary-1"
      />
      <InputComponent
        placeholder={'50000'}
        type={'number'}
        label="Amount paid"
        register={register}
        error={errors}
        name={'amountPaid'}
        pl="pl-[2rem]"
        min={10000}
        inputBg="bg-color-primary-2"
        validation={registrationOption.amountPaid}
        labelTextColor="text-color-primary-1"
      />
      <button
        disabled={isLoading}
        type="submit"
        className={`mt-[2rem] py-[1rem] flex justify-center items-center bg-color-primary-1 px-[3rem] sm:w-full sm:mt-[3rem] text-color-white  border border-color-primary-1 rounded-lg transition-all duration-300 ease-in ${
          isLoading && 'opacity-75'
        }`}
      >
        {isLoading ? (
          <FallingLines height="25" width="25" color={'white'} visible={true} />
        ) : (
          'Create Investment'
        )}
      </button>
    </form>
  );
};

export default DepositInvestmentForm;
