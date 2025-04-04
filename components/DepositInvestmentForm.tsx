'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import { futureMonth, toastError, toastSuccess } from '@/utils/helperFns';
import { FallingLines } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { createInvestmentDispatch } from '@/actions/investmentAction';
// import { createOrderAction } from '@/actions/ordersAction';
// import { ordersAction } from '@/slices/ordersSlice';
import InputComponent from './InputComponent';
import { investmentActions } from '@/slices/investmentSlice';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

const DepositInvestmentForm = () => {
  const dispatchFn = useAppDispatch();

  const router = useRouter();

  const { token } = useAppSelector((state) => state.investor);

  const { name } = useAppSelector((state) => state.investor.details);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [contractPeriod, setContractPeriod] = useState<any>(futureMonth(8));
  const [investmentType, setInvestmentType] = useState<string>('crypto');

  type FormData = {
    address: string;
    hash: string;
    amountPaid: string;
    maxDrawDown: number;
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
      hash: '',
      maxDrawDown: undefined,
    },
  });

  const resetForm = () => {
    reset({
      address: '',
      amountPaid: '',
      hash: '',
      maxDrawDown: undefined,
    });

    router.push(
      `/dashboard/${name
        .toLowerCase()
        .slice()
        .split(' ')
        .join('-')}/investments`
    );
  };

  // const closeInvestModal = (e: any) => {
  //   dispatchFn(investmentActions.toggleInvestmentModal(false));
  //   dispatchFn(investmentActions.setInvestmentType(''));
  // };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newData = {
      address: data.address,
      amount: data.amountPaid,
      contractPeriod,
      nextPayout: contractPeriod,
      maximumDrawdown: data.maxDrawDown,
      investmentType: investmentType,
    };

    dispatchFn(
      createInvestmentDispatch(
        newData,
        token,
        resetForm,

        setIsLoading,
        toastSuccess,
        toastError,
        <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap justify-between w-full">
        <InputComponent
          placeholder={process.env.NEXT_PUBLIC_PAYMENT_ADDRESS}
          type={'text'}
          label="Your Wallet Address"
          register={register}
          error={errors}
          name={'address'}
          pl="pl-[2rem]"
          validation={registrationOption.walletAddress}
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          inputBg="bg-color-primary-2"
          labelTextColor="text-color-primary-1"
        />
        <InputComponent
          placeholder={'80%'}
          type={'number'}
          label="Maximum Drawdown"
          register={register}
          error={errors}
          name={'maxDrawDown'}
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          pl="pl-[2rem]"
          min={10000}
          inputBg="bg-color-primary-2"
          validation={registrationOption.maxDrawDown}
          labelTextColor="text-color-primary-1"
        />
        <div className="w-[45%] xmd:w-[48%] sm:w-full mb-[2rem]">
          <label
            htmlFor="contract-period"
            className="capitalize  text-color-primary-1  "
          >
            Investment Type
          </label>
          <div className="px-[1rem] bg-white  rounded-md border border-color-primary-1 mt-[1rem]">
            <select
              name="contract-period"
              id="contract-period"
              className="mt-[.5rem] w-full  text-color-primary-1 py-[1rem] focus:border-0 focus:outline-none focus:ring-0 ring-0 outline-none"
              onChange={(e) => {
                setInvestmentType(e.target.value);
              }}
            >
              <option value={`crypto`}>Crypto</option>
              <option value={`stock`}>Stock</option>
              <option value={`forex`}>Forex</option>
            </select>
          </div>
        </div>

        <div className="w-[45%] xmd:w-[48%] sm:w-full mb-[2rem]">
          <label
            htmlFor="contract-period"
            className="capitalize  text-color-primary-1   "
          >
            Contract period
          </label>
          <div className="px-[1rem] bg-white  rounded-md border border-color-primary-1 mt-[1rem]">
            <select
              name="contract-period"
              id="contract-period"
              className="mt-[.5rem] w-full py-[1rem]  text-color-primary-1 focus:border-0 focus:outline-none focus:ring-0 ring-0 outline-none"
              onChange={(e) => {
                setContractPeriod(e.target.value);
              }}
            >
              <option value={`${futureMonth(8)}`}>8 months</option>
              <option value={`${futureMonth(12)}`}>1 year</option>
              <option value={`${futureMonth(16)}`}>1 year and 4 months</option>
              <option value={`${futureMonth(20)}`}>1 year and 8 months</option>
              <option value={`${futureMonth(24)}`}>2 years</option>
            </select>
          </div>
        </div>

        <InputComponent
          placeholder={'50000'}
          type={'number'}
          label="Amount (USDT BEP20)"
          register={register}
          error={errors}
          name={'amountPaid'}
          pl="pl-[2rem]"
          min={100}
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          inputBg="bg-color-primary-2"
          validation={registrationOption.amountPaid}
          labelTextColor="text-color-primary-1"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          checked={acceptTerms}
          onChange={() => {
            setAcceptTerms((prevState) => !prevState);
          }}
        />
        <label htmlFor="terms" className="ml-[0.5rem] cursor-pointer">
          Accept terms and conditions
        </label>
      </div>
      <button
        disabled={!acceptTerms || isLoading}
        type="submit"
        className={`mt-[2rem] py-[1rem] flex justify-center items-center bg-color-primary-1 px-[3rem] sm:w-full sm:mt-[3rem] text-color-white  border border-color-primary-1 rounded-lg transition-all duration-300 ease-in disabled:bg-gray-300 disabled:cursor-not-allowed  ${
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
