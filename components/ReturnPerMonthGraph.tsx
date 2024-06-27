'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { labels, returnMonthsData } from '@/utils/returnsPerMonthGraphData';
import { useAppSelector } from '@/hooks/customHook';
import GraphSkeleton from './skeletons/GraphSkeleton';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

ChartJS.register(...registerables);

ChartJS.defaults.color = 'rgba(67, 104, 80)';

const ReturnPerMonthGraph = () => {
  const isPhone = useMediaQuery({
    query: '(max-width: 630px)',
  });

  const history = useAppSelector((state) => state.roivalue.history);

  const historyGraphData = history.map((item: any) => {
    // it has value, month and id
    // i need id, value and month
    let month = labels[new Date(item.month).getMonth()];

    return {
      id: item._id,
      value: item.value,
      month,
    };
  });

  // data for the line chart
  const graphData = {
    labels: historyGraphData.map((item: any) => item.month),
    datasets: [
      {
        label: 'ROI per month',
        data: history.map((item: any) => item.value),
        borderColor: 'rgba(67, 104, 80)',
        backgroundColor: 'rgba(67, 104, 80)',
      },
    ],
  };

  // options for the line chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    elements: {
      point: {
        radius: 5,
      },
    },

    scales: {
      x: {
        title: {
          display: !isPhone,
          text: 'Month',
        },

        grid: {
          display: true,
          color: 'rgba(67, 104, 80, .3)',
        },
      },
      y: {
        title: {
          display: !isPhone,
          text: 'USD',
        },
        grid: {
          display: true,
          color: 'rgba(67, 104, 80, .3)',
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (val: any, value: number) {
            return val + ' %';
          },
        },
      },
    },
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        display: true, //This will do the task
      },
      title: {
        display: false,
        text: 'Returns Chart',
      },
    },
  };
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
      viewport={{ once: true }}
      className=" flex  flex-col w-[50%] lg:w-[85%] xmd:w-full  bg-color-secondary-1 rounded-lg shadow-lg overflow-hidden xlg:w-[48%] sm:h-[50rem]"
    >
      <p className="p-[1rem]  shadow-md text-[1.8rem] font-semibold text-color-secondary-1 bg-[#161616] uppercase">
        General Return on Investment
      </p>
      {history.length !== 0 && (
        <div className="p-[1rem] sm:p-0 flex-1 w-full items-center   flex justify-center">
          <Line
            data={graphData}
            options={options}
            className="flex-1"
            // height={'100%'}
          />
        </div>
      )}
      {history.length === 0 && (
        <div className="w-full h-full p-[3rem] sm:p-[2rem]">
          <GraphSkeleton />
        </div>
      )}
    </motion.div>
  );
};

export default ReturnPerMonthGraph;
