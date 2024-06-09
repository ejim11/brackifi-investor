'use client';
import React from 'react';
import { commentaries } from '@/utils/commentaryData';
import NewsTemp from './NewsTemp';
import { useAppSelector } from '@/hooks/customHook';

const FundPerformanceCommentary = () => {
  const reports = useAppSelector(
    (state) => state.fundPerformance.performanceReports
  );
  return (
    <div className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between">
      {reports.map((item: any, i: React.Key | null | undefined) => (
        <NewsTemp key={i} title={item.title} summary={item.summary} />
      ))}
    </div>
  );
};

export default FundPerformanceCommentary;
