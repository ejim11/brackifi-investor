'use client';
import React, { useState } from 'react';

const NewsTemp = ({ title, summary }: { title: string; summary: string }) => {
  const [onHoverState, setOnHoverState] = useState<boolean>(false);

  return (
    <div
      className="flex mb-[1rem] items-center hover:bg-color-black-light duration-150 transition-all ease-in cursor-pointer rounded-lg hover:text-color-secondary-1 "
      onMouseOver={() => {
        setOnHoverState(true);
      }}
      onMouseLeave={() => {
        setOnHoverState(false);
      }}
    >
      <div className="w-[8rem] h-[8rem] bg-color-tertiary-1 mr-[1.5rem]"></div>
      <div className="flex-1 ">
        <p
          className={`text-[1.7rem]   ${
            onHoverState ? 'text-color-primary-3' : 'text-color-primary-1'
          } `}
        >
          {title}
        </p>
        <p
          className={`text-[1.4rem]   ${
            onHoverState ? 'text-color-secondary-1' : 'text-color-secondary-2'
          } `}
        >
          {summary.slice(0, 80)}...
        </p>
      </div>
    </div>
  );
};

export default NewsTemp;
