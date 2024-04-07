'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from '@/components/InputComponent';
import { useAppDispatch } from '@/hooks/customHook';
import { resetPasswordDispatch } from '@/actions/shareholderAction';
import { IoMdLock } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { FallingLines } from 'react-loader-spinner';

const page = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  type FormData = {
    password: string;
    passwordConfirm: string;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const resetForm = () => {
    reset({
      password: '',
      passwordConfirm: '',
    });
  };

  const navigateFunc = () => {
    router.replace(`/auth/login`);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      resetPasswordDispatch(
        data,
        pathname.split('/')[3],
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
    <div className="w-full h-screen bg-home-bg bg-no-repeat bg-cover bg-center flex justify-center items-center font-nunito">
      <div className="bg-color-primary-2 w-[30%]  rounded-md p-[3rem] ">
        <p className="text-[2rem] text-[#767e86] text-center uppercase">
          Shareholder Portal
        </p>
        <p className="text-[2.5rem] text-color-secondary-2 uppercase text-center mt-[2rem]">
          Reset Password
        </p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-[2rem]"
          >
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
            <InputComponent
              placeholder={'Password Confirm'}
              type={'password'}
              register={register}
              error={errors}
              name={'passwordConfirm'}
              validation={registrationOption.password}
              icon={
                <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
              }
            />
            <button
              disabled={isLoading}
              type="submit"
              className={`my-[2rem] py-[1rem] flex justify-center items-center bg-color-primary-1 text-color-white w-full border border-color-primary-1 rounded-lg transition-all duration-300 ease-in ${
                isLoading && 'opacity-75'
              }`}
            >
              {isLoading ? (
                <FallingLines
                  height="20"
                  width="20"
                  color={'white'}
                  visible={true}
                />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>

        <p className="text-color-secondary-2 text-center">
          Please{' '}
          <span className="text-color-secondary-1">
            <a href="mailto:favourejim56@gmail.com">email our help desk</a>
          </span>{' '}
          with any login-related issues.
        </p>
      </div>
    </div>
  );
};

export default page;
