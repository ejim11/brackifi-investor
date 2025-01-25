'use client';
import React, { useEffect, useState } from 'react';
import DashboardFirstSec from '@/components/DashboardFirstSec';
import ReturnPerMonthGraph from '@/components/ReturnPerMonthGraph';
import Performance from '@/components/Performance';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { getRoiDetails } from '@/actions/roiValueAction';
import { getPerformanceReportDispatch } from '@/actions/fundsPerformanceAction';
import { getAllBusinessNewsDispatch } from '@/actions/businessNewsAction';
import { motion } from 'framer-motion';
import { investorAction } from '@/slices/investorSlice';
import { getAllInvestmentsDispatch } from '@/actions/investmentAction';

const page = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const prevMonthData: any = useAppSelector((state) => state.roivalue.history)
    .slice()
    .reverse()[0];

  const history = useAppSelector((state) => state.roivalue.history);

  const lastQuarterROi = history
    .slice(-4)
    .map((item: { value: number; month: string }) => item.value)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { name, id, email, phoneNumber, address } = JSON.parse(
        window.localStorage.getItem('investorDetails') || '{}'
      );

      const investorToken = window.localStorage.getItem('investorToken') || '';

      dispatch(
        investorAction.setInvestorDetails({
          name,
          id,
          email,
          phoneNumber,
          address,
        })
      );
      dispatch(getAllInvestmentsDispatch(investorToken, id, setIsLoading));
      dispatch(getRoiDetails());
      dispatch(getPerformanceReportDispatch());
      dispatch(getAllBusinessNewsDispatch());
    }
  }, []);

  return (
    <main className="bg-[#161616] bg-no-repeat bg-cover bg-center font-nunito w-full relative min-h-screen flex flex-col">
      <section className="bg-order-bg bg-no-repeat bg-cover bg-center rounded-br-lg rounded-bl-lg  pt-[12rem] px-[5rem] flex pb-[5rem] w-full flex-wrap flex-col xl:px-[3.5rem] xmd:px-[3rem] sm:px-[2rem] sm:pt-[10rem] flex-1">
        <DashboardFirstSec isLoading={isLoading} />
        <div className="w-full flex mt-[5rem] sm:mt-[3rem] justify-between xmd:flex-col xmd:items-center  ">
          <ReturnPerMonthGraph />
          {/* <DocumentLibraryAndReport /> */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.3 }}
            viewport={{ once: true }}
            className="w-[45%] lg:w-[40%] xmd:w-full xmd:mt-[3rem] bg-color-secondary-1 flex flex-col rounded-lg overflow-hidden "
          >
            <p className="p-[1rem] shadow-md text-[1.8rem] text-color-secondary-1 bg-color-black font-bold uppercase">
              Brackifi Perfomance Metrics
            </p>
            <div className="flex w-full  px-[2rem] py-[3rem] justify-between flex-1  ">
              <Performance
                percentage={lastQuarterROi ?? 0}
                title="Last Quarter ROI"
              />
              <Performance
                percentage={prevMonthData ? prevMonthData.value : 0}
                title="Past Month ROI"
                report={prevMonthData?.report ? prevMonthData.report : ''}
              />
            </div>
          </motion.div>
        </div>
      </section>
      <div>
        <p className="py-[1rem] bg-color-secondary-1 text-color-secondary-2 text-center">
          © Brackifi | 2024
        </p>
      </div>
    </main>
  );
};

export default page;
