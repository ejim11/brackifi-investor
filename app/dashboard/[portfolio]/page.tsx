'use client';
import React from 'react';
import { useAppSelector } from '@/hooks/customHook';
import DashboardFirstSec from '@/components/DashboardFirstSec';
import ReturnPerMonthGraph from '@/components/ReturnPerMonthGraph';
import ManagerCommentaries from '@/components/ManagerCommentaries';
import FundPerformanceCommentary from '@/components/FundPerformanceCommentary';
import Performance from '@/components/Performance';
import InvestmentPositions from '@/components/InvestmentPositions';
import DocumentLibraryAndReport from '@/components/DocumentLibraryAndReport';
import Messages from '@/components/Messages';

const page = () => {
  const { name, id } = useAppSelector((state) => state.shareholder.details);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full">
      <section className="bg-home-db-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] px-[5rem] flex pb-[5rem] w-full flex-wrap flex-col min-h-screen">
        <DashboardFirstSec />
        <div className="w-full flex mt-[5rem] justify-between">
          <ReturnPerMonthGraph />
          <DocumentLibraryAndReport />
        </div>
      </section>
      <section className="py-[5rem] px-[5rem] flex justify-between ">
        <div className=" bg-color-secondary-1 w-[28%] h-[40rem] rounded-md flex flex-col">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-primary-1 font-bold uppercase">
            manager commentary
          </p>
          <ManagerCommentaries />
        </div>
        <div className=" w-[28%] h-[40rem] bg-color-secondary-1 rounded-md flex flex-col">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-primary-1 font-bold uppercase">
            fund performance commentary
          </p>
          <FundPerformanceCommentary />
        </div>
        <div className=" w-[38%] h-[40rem] bg-color-secondary-1">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-primary-1 font-bold uppercase">
            Perfomance Metrics
          </p>
          <div className="flex w-full  p-[1.5rem] justify-between h-auto mt-[2rem]">
            <Performance percentage={60} title="Daily returns" />
            <Performance percentage={30} title="Token Value" />
          </div>
          <div className="p-[1.5rem] mt-[1rem]">
            <p className="text-[1.7rem] text-color-primary-1 uppercase font-semibold">
              Performance Comment
            </p>
            <p className="text-color-secondary-2 ">
              During the shareholder meeting, various topics concernining the
              growth of brackifi was discussed...
            </p>
          </div>
        </div>
      </section>
      <section className="pb-[5rem] px-[5rem] flex justify-between">
        <div className="bg-color-secondary-1 w-[48%] h-[40rem] rounded-md flex flex-col">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-primary-1 font-bold uppercase">
            Investment Positions
          </p>
          <div className="p-[1.5rem] flex-1 overflow-y-auto">
            <InvestmentPositions />
          </div>
        </div>
        <div className="w-[48%] h-[40rem] bg-color-secondary-1 rounded-md flex flex-col">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-primary-1 font-bold uppercase">
            Messages and Notifications
          </p>
          <Messages />
        </div>
      </section>
      {/* <section className="bg-home-bg h-[50rem] bg-center bg-no-repeat bg-cover"></section> */}
    </main>
  );
};

export default page;
