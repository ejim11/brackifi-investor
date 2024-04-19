'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { getAllReportsDispatch } from '@/actions/docsAndReportsAction';
import ReportsSkeleton from './skeletons/ReportsSkeleton';

const DocumentLibraryAndReport = () => {
  const dispatch = useAppDispatch();

  const { reports }: { reports: any } = useAppSelector(
    (state) => state.reports
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getAllReportsDispatch(setIsLoading));
  }, []);

  return (
    <div className="w-[45%] h-[40rem] bg-color-secondary-1 rounded-lg shadow-lg flex flex-col">
      <p className="p-[1rem] shadow-md text-[1.8rem] font-semibold text-color-primary-1 uppercase">
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
        <div className="w-full flex flex-col  overflow-y-auto flex-1 mt-[1rem] p-[1rem]">
          {reports.map((report: any, i: number) => (
            <div
              key={i}
              className="w-full flex p-[1rem] mb-[1rem] last:mb-0 items-center"
            >
              <div className="w-[10rem] h-[10rem] bg-color-secondary-2 rounded-md"></div>
              <div className="mx-[1rem] flex-1">
                <p className="text-color-primary-1 text-[1.7rem] font-semibold">
                  {report.title}
                </p>
                <p className="text-color-tertiary-1">{report.summary}</p>
                <p className="text-[1.4rem] text-color-secondary-2">
                  {report.date}
                </p>
              </div>
              <button className="w-auto bg-color-primary-1 text-color-white p-[1rem] rounded-md border border-color-primary-1 hover:text-color-primary-1 hover:bg-color-transparent font-semibold transition-all duration-100 ease-in ">
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentLibraryAndReport;
