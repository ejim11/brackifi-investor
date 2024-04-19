'use client';
import React from 'react';
import { commentaries } from '@/utils/commentaryData';

const ManagerCommentaries = () => {
  return (
    <div className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between">
      {commentaries.map((item, i) => (
        <div key={i} className="flex mb-[1rem]">
          <div className="w-[8rem] h-[8rem] bg-color-tertiary-1 mr-[1.5rem]"></div>
          <div className="flex-1 ">
            <p className="text-[1.5rem] text-color-tertiary-1">{item.title}</p>
            <p className="text-[1.3rem] text-color-secondary-2">
              {item.summary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagerCommentaries;
