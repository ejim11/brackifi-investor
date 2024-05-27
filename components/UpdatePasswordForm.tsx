'use client';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from './InputComponent';
import { AiOutlineMail } from 'react-icons/ai';
import { IoMdLock } from 'react-icons/io';
import { useAppDispatch } from '@/hooks/customHook';
import { updateMyPasswordDispatch } from '@/actions/investorAction';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { FallingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/customHook';

const UpdatePasswordForm = () => {
  type FormData = {
    passwordCurrent: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  const { token }: { token: string } = useAppSelector(
    (state) => state.shareholder
  );

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
      passwordCurrent: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const resetForm = () => {
    reset({
      passwordCurrent: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem('shareholderToken');
    localStorage.removeItem('shareholderDetails');
    router.replace('/auth/login');
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      updateMyPasswordDispatch(
        data,
        token,
        setIsLoading,
        toastSuccess,
        toastError,
        <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />,
        resetForm,
        logoutHandler
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputComponent
        placeholder={'Current Password'}
        label="Current Password"
        type={'password'}
        register={register}
        error={errors}
        name={'passwordCurrent'}
        validation={registrationOption.password}
        icon={
          <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
        }
      />
      <InputComponent
        placeholder={'New Password'}
        type={'password'}
        label="New Password"
        register={register}
        error={errors}
        name={'newPassword'}
        validation={registrationOption.password}
        icon={
          <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
        }
      />
      <InputComponent
        placeholder={'New Password Confirm'}
        type={'password'}
        label="New Password Confirm"
        register={register}
        error={errors}
        name={'confirmNewPassword'}
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
          'Submit'
        )}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
