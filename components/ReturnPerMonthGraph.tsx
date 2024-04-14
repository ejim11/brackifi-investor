'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { labels, returnMonthsData } from '@/utils/returnsPerMonthGraphData';

ChartJS.register(...registerables);

ChartJS.defaults.color = 'rgba(67, 104, 80)';

const ReturnPerMonthGraph = () => {
  // data for the line chart
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: 'ROI per month',
        data: returnMonthsData.map((item) => item.return),
        borderColor: 'rgba(67, 104, 80)',
        backgroundColor: 'rgba(67, 104, 80)',
      },
    ],
  };

  // options for the line chart
  const options = {
    responsive: true,

    elements: {
      point: {
        radius: 5,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },

        grid: {
          display: true,
          color: 'rgba(67, 104, 80, .3)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'USD',
        },
        grid: {
          display: true,
          color: 'rgba(67, 104, 80, .3)',
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (val: any, value: number) {
            return '$' + val;
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
    <div className=" flex  flex-col w-[50%] bg-color-secondary-1 rounded-lg shadow-lg">
      <p className="p-[1rem] shadow-md text-[1.8rem] font-semibold text-color-primary-1 uppercase">
        Return on Investment
      </p>
      <div className="p-[1.5rem] flex-1 w-full">
        <Line data={graphData} options={options} />
      </div>
    </div>
  );
};

export default ReturnPerMonthGraph;
