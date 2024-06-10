'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from '@/components/InputComponent';
import { useAppDispatch } from '@/hooks/customHook';
import { forgotPasswordDispatch } from '@/actions/investorAction';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { FallingLines } from 'react-loader-spinner';
import { toastError, toastSuccess } from '@/utils/helperFns';
import Link from 'next/link';

const page = () => {
  const dispatch = useAppDispatch();

  type FormData = {
    email: string;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  const resetForm = () => {
    reset({
      email: '',
    });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      forgotPasswordDispatch(
        data,
        setIsLoading,
        toastSuccess,
        toastError,
        <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />,
        resetForm
      )
    );
  };

  return (
    <div className="w-full h-screen bg-home-bg bg-no-repeat bg-cover bg-center flex justify-center items-center font-nunito">
      <div className="bg-color-primary-2 w-[38%]  rounded-md p-[3rem] 2xl:w-[36%] xlg:w-[40%] lg:w-[50%] md:w-[60%] smd:w-[90%]  sm:p-[1.5rem] ">
        <p className="text-[2rem] text-[#767e86] text-center uppercase">
          Investor Portal
        </p>
        <p className="text-[2.5rem] text-color-secondary-2 uppercase text-center mt-[2rem]">
          Forgot Password
        </p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-[2rem]"
          >
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
            <button
              disabled={isLoading}
              type="submit"
              className={`my-[2rem] py-[1rem] flex justify-center items-center bg-color-primary-1 text-color-white w-full border border-color-primary-1 rounded-lg transition-all duration-300 ease-in ${
                isLoading && 'opacity-75'
              }`}
            >
              {isLoading ? (
                <FallingLines
                  height="25"
                  width="25"
                  color={'white'}
                  visible={true}
                />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
        <div className=" mt-[2rem] text-color-secondary-1 flex items-center justify-center">
          <p className="mr-[1rem] text-color-primary-1">
            Remembered login details?{' '}
          </p>
          <Link href={'/auth/login'}>Login</Link>
        </div>
        {/* <p className="text-color-secondary-2 text-center">
          Please{' '}
          <span className="text-color-secondary-1">
            <a href="mailto:favourejim56@gmail.com">email our help desk</a>
          </span>{' '}
          with any login-related issues.
        </p> */}
      </div>
    </div>
  );
};

export default page;
