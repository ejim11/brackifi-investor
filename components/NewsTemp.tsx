'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

const NewsTemp = ({
  title,
  summary,
  image,
  file,
  link,
  type,
}: {
  title: string;
  summary: string;
  image: string;
  file?: string;
  link?: string;
  type?: string;
}) => {
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -30 },
  };

  const [onHoverState, setOnHoverState] = useState<boolean>(false);

  const imgHost =
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? process.env.NEXT_PUBLIC_LOCAL_HOST
      : process.env.NEXT_PUBLIC_WEB_HOST;

  return (
    <motion.a
      variants={item}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      href={`${file ? `${imgHost}/${file}` : link}`}
      target="blank"
      className="flex mb-[1rem] items-center bg-color-black-light-2 hover:bg-color-black-light duration-150 transition-all ease-in cursor-pointer rounded-lg hover:text-color-secondary-1 "
      onMouseOver={() => {
        setOnHoverState(true);
      }}
      onMouseLeave={() => {
        setOnHoverState(false);
      }}
    >
      <div
        className={`w-[8rem] h-[8rem] ${
          type === 'business'
            ? 'xl:w-[15rem] xl:h-[15rem] sm:w-[10rem]'
            : 'lg:w-[10rem] xl:h-[15rem] xmd:w-[15rem] sm:w-[10rem]'
        }   `}
      >
        <Image
          src={`${imgHost}/${image}`}
          alt=""
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-[1rem]">
        <p
          className={`text-[1.7rem]  2xl:text-[1.6rem] sm:text-[1.5rem]   ${
            onHoverState ? 'text-color-primary-3' : 'text-color-primary-1'
          } `}
        >
          {title}
        </p>
        <p
          className={`text-[1.4rem] hidden xl:block   ${
            onHoverState ? 'text-color-secondary-1' : 'text-color-secondary-2'
          } `}
        >
          {summary.slice(0, 90)}...
        </p>
      </div>
    </motion.a>
  );
};

export default NewsTemp;
