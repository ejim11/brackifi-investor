'use client';
import React from 'react';
// import { useAppSelector } from '@/hooks/customHook';
import DashboardFirstSec from '@/components/DashboardFirstSec';
import ReturnPerMonthGraph from '@/components/ReturnPerMonthGraph';
import ManagerCommentaries from '@/components/ManagerCommentaries';
import FundPerformanceCommentary from '@/components/FundPerformanceCommentary';
import Performance from '@/components/Performance';
import InvestmentPositions from '@/components/InvestmentPositions';
import DocumentLibraryAndReport from '@/components/DocumentLibraryAndReport';
import Messages from '@/components/News';
import { useAppSelector } from '@/hooks/customHook';
import CreateInvestmentModal from '@/components/CreateInvestmentModal';

const page = () => {
  // const { name, id } = useAppSelector((state) => state.shareholder.details);
  const isOpen = useAppSelector((state) => state.investments.isOpen);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full relative">
      <section className="bg-order-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] px-[5rem] flex pb-[5rem] w-full flex-wrap flex-col ">
        <DashboardFirstSec />
        <div className="w-full flex mt-[5rem] justify-between">
          <ReturnPerMonthGraph />
          <DocumentLibraryAndReport />
        </div>
      </section>
      <section className="py-[5rem] px-[5rem] flex justify-between ">
        <div className=" flex-1 h-[40rem] bg-color-secondary-1 rounded-lg flex flex-col overflow-hidden">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1  font-bold uppercase">
            fund performance commentary
          </p>
          <FundPerformanceCommentary />
        </div>
        <div className="flex-1 h-[40rem] mx-[3rem] bg-color-secondary-1 flex flex-col rounded-lg overflow-hidden">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1 font-bold uppercase">
            Perfomance Metrics
          </p>
          <div className="flex w-full  px-[2rem] py-[3rem] justify-between flex-1  ">
            <Performance percentage={60} title="Daily ROI" />
            <Performance percentage={30} title="Past Month ROI" />
          </div>
        </div>
        <div className=" flex-1  h-[40rem] bg-color-secondary-1 rounded-lg flex flex-col overflow-hidden">
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1 font-bold uppercase">
            Business News
          </p>
          <Messages />
        </div>
      </section>
      {/* <section className="bg-home-bg h-[50rem] bg-center bg-no-repeat bg-cover"></section> */}
    </main>
  );
};

export default page;
