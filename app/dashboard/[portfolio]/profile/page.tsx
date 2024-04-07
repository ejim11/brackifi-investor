'use client';
import React from 'react';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

const page = () => {
  return (
    <div>
      <section className="bg-portfolio-bg bg-no-repeat bg-cover bg-center h-[40rem] bg-color-primary-1 rounded-bl-lg rounded-br-lg pt-[10rem] px-[10rem]"></section>
      <div className="w-full py-[10rem] px-[10rem] ">
        <div className="w-[60%]">
          <p>Update Password Form</p>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default page;
