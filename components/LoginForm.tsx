'use client';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from './InputComponent';
import { AiOutlineMail } from 'react-icons/ai';
import { IoMdLock } from 'react-icons/io';
import { useAppDispatch } from '@/hooks/customHook';
import { loginInvestorHandler } from '@/actions/investorAction';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { FallingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  type FormData = {
    email: string;
    password: string;
  };

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetForm = () => {
    reset({
      email: '',
      password: '',
    });
  };

  const navigateFunc = ({ id, name }: { id: string; name: string }) => {
    router.replace(
      `/dashboard/${name.toLowerCase().slice().split(' ').join('-')}`
    );
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      loginInvestorHandler(
        data,
        setIsLoading,
        toastSuccess,
        toastError,
        <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />,
        resetForm,
        navigateFunc
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputComponent
        placeholder={'Email'}
        type={'email'}
        register={register}
        error={errors}
        name={'email'}
        validation={registrationOption.email}
        icon={
          <AiOutlineMail className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
        }
      />
      <InputComponent
        placeholder={'Password'}
        type={'password'}
        register={register}
        error={errors}
        name={'password'}
        validation={registrationOption.password}
        icon={
          <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
        }
      />
      <button
        disabled={isLoading}
        type="submit"
        className={`mt-[4rem] py-[1rem] flex justify-center items-center bg-color-primary-1 text-color-white w-full border border-color-primary-1 rounded-lg transition-all duration-300 ease-in ${
          isLoading && 'opacity-75'
        }`}
      >
        {isLoading ? (
          <FallingLines height="25" width="25" color={'white'} visible={true} />
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
