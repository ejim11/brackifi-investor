'use client';
import React from 'react';
import { messages } from '@/utils/commentaryData';

const Messages = () => {
  return (
    <div className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between h-full">
      {messages.map((item: any, i: React.Key | null | undefined) => (
        <div key={i} className="flex mb-[1rem] ">
          <div className="w-[5rem] h-[5rem] bg-color-tertiary-1 mr-[3rem]"></div>
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

export default Messages;
