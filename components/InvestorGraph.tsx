'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useMediaQuery } from 'react-responsive';
import modifyNum from '@/utils/modifyAmount';
import { formatNumber } from '@/utils/numberFormatter';
import { useAppSelector } from '@/hooks/customHook';
import { getLatestInvRoi } from './DashboardFirstSec';
import { InvestmentItemType } from '@/app/dashboard/[portfolio]/investments/page';

const InvestorGraph = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 650px)',
  });

  const { investments } = useAppSelector((state) => state.investments);

  const data = investments
    .filter(
      (investment: InvestmentItemType) =>
        investment.investmentState === 'active' ||
        investment.investmentState === 'up for withdrawal'
    )
    .map((inv: InvestmentItemType) => ({
      type: inv.investmentType,
      deposit: inv.amount,
      profit: getLatestInvRoi(inv)
        ? Math.round((inv.amount * getLatestInvRoi(inv)) / 100)
        : 0,
    }));

  const cryptoData = data.filter((inv) => inv.type === 'crypto');
  const stockData = data.filter((inv) => inv.type === 'stock');
  const forexData = data.filter((inv) => inv.type === 'forex');

  const graphData = [
    {
      investmentType: 'CRYPTO',
      deposit: cryptoData
        .map((inv) => inv.deposit)
        .reduce((acc, cur) => acc + cur, 0),
      profit: cryptoData
        .map((inv) => inv.profit)
        .reduce((acc, cur) => acc + cur, 0),
    },

    {
      investmentType: 'STOCK',
      deposit: stockData
        .map((inv) => inv.deposit)
        .reduce((acc, cur) => acc + cur, 0),
      profit: stockData
        .map((inv) => inv.profit)
        .reduce((acc, cur) => acc + cur, 0),
    },
    {
      investmentType: 'FOREX',
      deposit: forexData
        .map((inv) => inv.deposit)
        .reduce((acc, cur) => acc + cur, 0),
      profit: forexData
        .map((inv) => inv.profit)
        .reduce((acc, cur) => acc + cur, 0),
    },
  ];

  const investmentsStats = [
    {
      title: 'Total Deposit',
      val: graphData
        .map((item) => item.deposit)
        .reduce((acc, cur) => acc + cur, 0),
      color: 'bg-[rgba(67,104,80)]',
    },
    {
      title: 'Total Profit',
      val: graphData
        .map((item) => item.profit)
        .reduce((acc, cur) => acc + cur, 0),
      color: 'bg-[#a9e34b]',
    },
  ];

  return (
    <>
      {investments.length > 0 ? (
        <div className="w-full bg-color-secondary-3 mt-[5rem] rounded-lg p-[3rem] sm:p-[1.5rem]">
          <h3 className="text-[3rem] font-nunito font-medium  ">
            Active Investments
          </h3>
          <div className="flex mt-[5rem] smd:mt-[1.5rem] w-full smd:flex-col">
            <div className="pr-[2.5rem] border-r border-r-[rgba(0,0,0,0.15)] smd:flex smd:border-r-0 smd:my-[2rem] smd:pr-0">
              {investmentsStats.map((stat: any) => (
                <div
                  key={stat.title}
                  className="flex flex-col mb-[5rem] last:mb-0 smd:mr-[2.5rem] smd:last:mr-0"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-[1rem] h-[1rem] ${stat.color} rounded-[0.2rem] mr-[0.5rem] `}
                    ></div>
                    <p>{stat.title}</p>
                  </div>
                  <p className="text-[3.2rem] font-medium">
                    ${modifyNum(String(stat.val))}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex-1 h-[40rem] sm:h-[50rem]     ml-[5rem] smd:ml-0   ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  // width={400}
                  // height={300}
                  data={graphData}
                  margin={{
                    top: 0,
                    right: 0,
                    left: isMobile ? -35 : 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3"
                    vertical={false}
                    fill="rgba(0,0,0,0.2)"
                  />
                  <XAxis dataKey="investmentType" tick={{ fill: '#555335' }} />
                  <YAxis
                    axisLine={false}
                    tick={{ fill: '#555335' }}
                    tickFormatter={(value) => `$${formatNumber(value)}`}
                  />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar
                    dataKey="deposit"
                    stackId="a"
                    fill="rgba(67,104,80)"
                    // radius={[10, 10, 0, 0]}
                  />
                  <Bar
                    dataKey="profit"
                    stackId="a"
                    fill="#a9e34b"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default InvestorGraph;
