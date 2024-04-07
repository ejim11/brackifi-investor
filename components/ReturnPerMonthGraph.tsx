'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { labels, returnMonthsData } from '@/utils/returnsPerMonthGraphData';

ChartJS.register(...registerables);

ChartJS.defaults.color = 'rgba(210, 183, 116, 1)';

const ReturnPerMonthGraph = () => {
  // data for the line chart
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: 'Returns per month',
        data: returnMonthsData.map((item) => item.return),
        borderColor: 'rgba(210, 183, 116, 1)',
        backgroundColor: 'rgba(210, 183, 116, 1)',
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
          color: 'rgba(210, 183, 116, .3)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'USD',
        },
        grid: {
          display: true,
          color: 'rgba(210, 183, 116, .3)',
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
    <div className=" p-[1.5rem] flex items-center justify-center flex-col">
      <Line data={graphData} options={options} />
    </div>
  );
};

export default ReturnPerMonthGraph;
