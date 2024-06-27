'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { getAllReportsDispatch } from '@/actions/docsAndReportsAction';
import ReportsSkeleton from './skeletons/ReportsSkeleton';
import Image from 'next/image';
import { motion } from 'framer-motion';

const DocumentLibraryAndReport = () => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  const dispatch = useAppDispatch();

  const { reports }: { reports: any } = useAppSelector(
    (state) => state.reports
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getAllReportsDispatch(setIsLoading));
  }, []);

  console.log(process.env.NEXT_PUBLIC_ENVIROMENT);

  const imgHost =
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? process.env.NEXT_PUBLIC_LOCAL_HOST
      : process.env.NEXT_PUBLIC_WEB_HOST;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
      className="w-[45%] xlg:w-[48%] lg:w-[85%] lg:mt-[4rem] h-[40rem] bg-color-secondary-1 rounded-lg shadow-lg flex flex-col overflow-hidden lg:h-auto xmd:w-full"
    >
      <p className="p-[1rem] shadow-md text-[1.8rem] font-semibold text-color-secondary-1 bg-[#161616] uppercase">
        Document Library And Reports
      </p>
      {isLoading && (
        <div className="w-full flex flex-col  overflow-y-auto flex-1 mt-[1rem] px-[1rem]">
          <ReportsSkeleton />
          <ReportsSkeleton />
          <ReportsSkeleton />
          <ReportsSkeleton />
        </div>
      )}
      {!isLoading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="w-full flex flex-col  overflow-y-auto flex-1 mt-[1rem] p-[1rem]"
        >
          {reports.map((report: any, i: number) => (
            <motion.div
              variants={item}
              key={i}
              className="w-full flex p-[1.5rem] mb-[1.5rem] last:mb-0 items-center  bg-color-black-light-2 rounded-lg "
            >
              <div className="w-[10rem] h-[10rem]  rounded-md">
                <Image
                  src={`${imgHost}/${report.docImage}`}
                  alt={`${report.title}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mx-[1rem] flex-1">
                <p className="text-color-primary-1 text-[1.7rem] font-semibold capitalize">
                  {report.title}
                </p>
                <p className="text-color-tertiary-1">{report.summary}</p>
                {/* <p className="text-[1.4rem] text-color-secondary-2">
                  {report.date}
                </p> */}
              </div>
              <a
                href={`${imgHost}/${report.docFile}`}
                download={true}
                target="blank"
                className="w-auto bg-color-primary-1 text-color-white py-[0.5rem] px-[1rem] rounded-md border border-color-primary-1 hover:text-color-primary-1 hover:bg-color-transparent font-semibold transition-all duration-100 ease-in "
              >
                View
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DocumentLibraryAndReport;
