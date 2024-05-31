'use client';
import React from 'react';
import { commentaries } from '@/utils/commentaryData';
import NewsTemp from './NewsTemp';

const FundPerformanceCommentary = () => {
  return (
    <div className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between">
      {commentaries.map((item: any, i: React.Key | null | undefined) => (
        <NewsTemp key={i} title={item.title} summary={item.summary} />
      ))}
    </div>
  );
};

export default FundPerformanceCommentary;
