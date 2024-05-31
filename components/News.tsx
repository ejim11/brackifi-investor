'use client';
import React, { useState } from 'react';
import { news } from '@/utils/commentaryData';
import NewsTemp from './NewsTemp';

const News = () => {
  const [onHoverState, setOnHoverState] = useState<boolean>(false);

  return (
    <div className="p-[2.5rem]  overflow-y-auto flex-1 flex flex-col justify-between h-full ">
      {news.map((item: any, i: number) => (
        <NewsTemp title={item.title} summary={item.summary} key={i} />
      ))}
    </div>
  );
};

export default News;
