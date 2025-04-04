'use client';
import LoginForm from '@/components/LoginForm';
import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="w-full h-screen bg-home-bg bg-no-repeat bg-cover bg-center flex justify-center items-center font-nunito">
      <div className="bg-color-primary-2 w-[38%] 2xl:w-[36%] xlg:w-[50%]  md:w-[70%] smd:w-[90%]  rounded-md p-[3rem] sm:p-[1.5rem]">
        <p className="text-[2rem] text-[#767e86] text-center uppercase">
          Investor Portal
        </p>
        <p className="text-[2.5rem] text-color-secondary-2 uppercase text-center mt-[2rem]">
          Login
        </p>
        <p className="text-center text-[1.4rem] text-color-secondary-2 border  border-[#e7bc1f] bg-[rgba(231,188,31,.1)] p-[1rem] mb-[4rem]">
          You need to sign in or sign up before access.
        </p>
        <LoginForm />
        <div className="flex flex-col items-center mt-[2rem] text-color-secondary-1">
          <Link href={'/auth/forgot-password'}>Forgot password?</Link>
          <Link href={'/auth/add-member'}>Need access?</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
