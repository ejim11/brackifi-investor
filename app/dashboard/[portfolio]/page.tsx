'use client';
import React, { useEffect } from 'react';
import DashboardFirstSec from '@/components/DashboardFirstSec';
import ReturnPerMonthGraph from '@/components/ReturnPerMonthGraph';
import FundPerformanceCommentary from '@/components/FundPerformanceCommentary';
import Performance from '@/components/Performance';
import DocumentLibraryAndReport from '@/components/DocumentLibraryAndReport';
import News from '@/components/News';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { getRoiDetails } from '@/actions/roiValueAction';
import { getPerformanceReportDispatch } from '@/actions/fundsPerformanceAction';
import { getAllBusinessNewsDispatch } from '@/actions/businessNewsAction';
import { InvestmentItemType } from './invest/page';
import { dateDiffInDays } from '@/utils/helperFns';
import { getInvestorDispatch } from '@/actions/investorAction';
import { motion } from 'framer-motion';

const page = () => {
  const dispatch = useAppDispatch();
  const prevMonthData: any = useAppSelector((state) => state.roivalue.history)
    .slice()
    .reverse()[0];

  const { token, details } = useAppSelector((state: any) => state.investor);

  const investments = useAppSelector(
    (state) => state.investments.investments
  ).filter((inv: InvestmentItemType) => inv.investmentState === 'active');

  const getLatestInvestment = (): InvestmentItemType => {
    const inv = investments
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      )[0];

    return inv;
  };

  const latestInv = getLatestInvestment();

  useEffect(() => {
    dispatch(getRoiDetails());
    dispatch(getPerformanceReportDispatch());
    dispatch(getAllBusinessNewsDispatch());
    dispatch(getInvestorDispatch(details.id, token));
  }, []);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full relative">
      <section className="bg-order-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] px-[5rem] flex pb-[5rem] w-full flex-wrap flex-col xl:px-[3.5rem] xmd:px-[3rem] sm:px-[2rem]">
        <DashboardFirstSec />
        <div className="w-full flex mt-[5rem] justify-between  lg:flex-col lg:items-center">
          <ReturnPerMonthGraph />
          <DocumentLibraryAndReport />
        </div>
      </section>
      <section className="py-[5rem] px-[5rem] flex justify-between xl:flex-wrap  h-auto xl:px-[3.5rem] xmd:px-[3rem] sm:px-[2rem]">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0 }}
          viewport={{ once: true }}
          className=" flex-1 h-[40rem] bg-color-secondary-1 rounded-lg flex flex-col overflow-hidden xl:flex-[45%] xmd:flex-[100%] xmd:h-auto xmd:order-2 xmd:mt-[4rem]"
        >
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1  font-bold uppercase">
            fund performance commentary
          </p>
          <FundPerformanceCommentary />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.3 }}
          viewport={{ once: true }}
          className="flex-1 h-[40rem] xl:ml-[3rem] mx-[3rem] xl:mx-0 bg-color-secondary-1 flex flex-col rounded-lg overflow-hidden xl:flex-[45%] xmd:flex-[100%] xmd:ml-0  xmd:order-1"
        >
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1 font-bold uppercase">
            Perfomance Metrics
          </p>
          <div className="flex w-full  px-[2rem] py-[3rem] justify-between flex-1  ">
            <Performance
              percentage={latestInv ? latestInv.maximumDrawdown : 0}
              title="Maximum Drawdown"
            />
            <Performance
              percentage={prevMonthData ? prevMonthData.value : 0}
              title="Past Month ROI"
              report={prevMonthData?.report ? prevMonthData.report : ''}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.6 }}
          viewport={{ once: true }}
          className=" flex-1  h-[40rem] bg-color-secondary-1 rounded-lg flex flex-col overflow-hidden xl:flex-[100%] xl:mt-[4rem] xmd:order-3 xmd:h-auto"
        >
          <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-primary-1 font-bold uppercase">
            Business News
          </p>
          <News />
        </motion.div>
      </section>
      {/* <section className="bg-home-bg h-[50rem] bg-center bg-no-repeat bg-cover"></section> */}
    </main>
  );
};

export default page;
