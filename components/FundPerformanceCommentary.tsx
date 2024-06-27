'use client';
import React from 'react';
import { commentaries } from '@/utils/commentaryData';
import NewsTemp from './NewsTemp';
import { useAppSelector } from '@/hooks/customHook';
import { motion } from 'framer-motion';

const FundPerformanceCommentary = () => {
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

  const reports = useAppSelector(
    (state) => state.fundPerformance.performanceReports
  );
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={list}
      viewport={{ once: true }}
      // transition={{ duration: , ease: 'easeIn' }}
      className="p-[1.5rem]  overflow-y-auto flex-1 flex flex-col justify-between"
    >
      {reports.map((item: any, i: React.Key | null | undefined) => (
        <NewsTemp
          key={i}
          title={item.title}
          summary={item.summary}
          image={item.docImage}
          file={item.docFile}
        />
      ))}
    </motion.div>
  );
};

export default FundPerformanceCommentary;
