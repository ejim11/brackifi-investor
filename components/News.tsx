'use client';
import React from 'react';
import { news } from '@/utils/commentaryData';

const News = () => {
  return (
    <div className="p-[2.5rem]  overflow-y-auto flex-1 flex flex-col justify-between h-full">
      {news.map((item: any, i: React.Key | null | undefined) => (
        <div key={i} className="flex mb-[1.5rem] items-center">
          <div className="w-[10rem] h-[10rem] bg-color-tertiary-1 mr-[2rem]"></div>
          <div className="flex-1 ">
            <p className="text-[1.8rem] text-color-primary-1">{item.title}</p>
            <p className="text-[1.5rem] text-color-secondary-2">
              {item.summary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
