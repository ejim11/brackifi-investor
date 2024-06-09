'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const NewsTemp = ({
  title,
  summary,
  image,
  file,
  link,
}: {
  title: string;
  summary: string;
  image: string;
  file?: string;
  link?: string;
}) => {
  const [onHoverState, setOnHoverState] = useState<boolean>(false);

  const imgHost =
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? `http://127.0.0.1:3009`
      : 'https://brackifi-be.onrender.com';

  return (
    <a
      href={`${file ? `${imgHost}/${file}` : link}`}
      target="blank"
      className="flex mb-[1rem] items-center hover:bg-color-black-light duration-150 transition-all ease-in cursor-pointer rounded-lg hover:text-color-secondary-1 "
      onMouseOver={() => {
        setOnHoverState(true);
      }}
      onMouseLeave={() => {
        setOnHoverState(false);
      }}
    >
      <div className="w-[8rem] h-[8rem] bg-color-tertiary-1 mr-[1.5rem]">
        <Image
          src={`${imgHost}/${image}`}
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 ">
        <p
          className={`text-[1.7rem]   ${
            onHoverState ? 'text-color-primary-3' : 'text-color-primary-1'
          } `}
        >
          {title}
        </p>
        {/* <p
          className={`text-[1.4rem]   ${
            onHoverState ? 'text-color-secondary-1' : 'text-color-secondary-2'
          } `}
        >
          {summary.slice(0, 60)}...
        </p> */}
      </div>
    </a>
  );
};

export default NewsTemp;
