'use client';
import React from 'react';
import NewsTemp from './NewsTemp';
import { useAppSelector } from '@/hooks/customHook';
import { motion } from 'framer-motion';

const News = () => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const news = useAppSelector((state) => state.businessNews.news);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={list}
      className="p-[1.5rem] xl:p-[3rem] xmd:p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between h-full  "
    >
      {news.map((item: any, i: number) => (
        <NewsTemp
          title={item.title}
          summary={item.summary}
          image={item.image}
          link={item.link}
          key={i}
          type={'business'}
        />
      ))}
    </motion.div>
  );
};

export default News;
