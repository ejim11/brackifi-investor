'use client';
import React from 'react';
import NewsTemp from './NewsTemp';
import { useAppSelector } from '@/hooks/customHook';

const News = () => {
  const news = useAppSelector((state) => state.businessNews.news);

  return (
    <div className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between h-full ">
      {/* {news.map((item: any, i: number) => (
        <NewsTemp title={item.title} summary={item.summary} key={i} />
      ))} */}
    </div>
  );
};

export default News;
