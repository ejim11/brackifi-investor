'use client';
import React from 'react';
import Link from 'next/link';
import AddMemberForm from '@/components/AddMemberForm';
import { FiChevronsLeft } from 'react-icons/fi';

const page = () => {
  return (
    <main className="pt-[12rem]   px-[12rem] pb-[5rem] xlg:px-[5rem] smd:px-[2.5rem] ssm:px-[1.5rem] font-nunito bg-color-primary-2  flex flex-col ">
      <Link
        href={'/auth/login'}
        className="self-start text-[1.7rem] text-color-primary-1 mb-[3rem] flex items-center "
      >
        <FiChevronsLeft className="w-[2.2rem] h-[2.2rem] text-color-curentColor" />
        <span>Login</span>
      </Link>
      <p className="text-[3rem] sm:text-[2rem] text-color-primary-1 ">
        Investor Portal Access Request Form
      </p>
      <div className="w-full flex-1 flex justify-between mt-[2rem] overflow-auto ">
        <div className="flex-1 mr-[3rem] lg:mr-0 ">
          <div className="bg-color-white rounded-md p-[3rem] sm:p-[1.5rem] text-color-secondary-2">
            <p className="text-[2.5rem] sm:text-[2rem] text-color-secondary-1">
              Thank you for your interest in accessing Brackifi's Investor
              Portal.
            </p>
            <p className="text-color-secondary-2 text-justify mt-[1.5rem]">
              Access to brackifi is restricted. In order to obtain access,
              please complete and submit this form. A member of our Client
              Relationship Group will contact you within 24 hours to verify the
              information you submit and complete your registration.
            </p>
            <p className="text-justify my-[1rem]">
              All information provided on this questionnaire will be held in
              confidence in accordance with Brackifi Asset Management LP's{' '}
              <span className="text-color-secondary-1">
                <Link href="">Privacy Policy</Link>
              </span>{' '}
              as in effect from time to time.
            </p>
          </div>
          <div className="w-full bg-color-white rounded-md  mt-[2rem] p-[3rem] sm:p-[1.5rem]">
            <AddMemberForm />
          </div>
        </div>

        <div className=" w-[30rem] lg:hidden ">
          <div className="bg-color-white p-[2rem] w-full ">
            <p className="text-justify">
              If you have any questions or experience any difficulty completing
              this form, we invite you to contact our Client Relationship Group
              at{' '}
              <span className="text-color-secondary-1">
                <a href="mailto:favourejim56@gmail.com">
                  Investorrelations@brackifi.com
                </a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
