'use client';
import formatDate from '@/utils/dateFormatter';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Performance = ({
  percentage,
  title,
  report,
}: {
  percentage: number;
  title: string;
  report?: any;
}) => {
  return (
    <div className="shadow-lg w-[48%]  h-full bg-color-black-light rounded-lg flex items-center flex-col p-[1.5rem]">
      <div className="w-[13rem] h-[13rem]">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',

            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(210, 183, 116, 1)`,
            textColor: 'rgba(210, 183, 116, 1)',
            trailColor: 'rgba(0, 0, 0,0.5)',
            backgroundColor: 'rgba(0, 0, 0)',
          })}
        />
      </div>
      <div>
        <p className="text-[1.8rem] text-color-secondary-1 font-nunito font-bold uppercase mt-[2rem] text-center">
          {title}
        </p>
      </div>
      {title.includes('Month') ? (
        <p className="mt-auto px-[1.5rem] py-[0.5rem] bg-color-primary-1 text-color-white border border-color-primary-1 rounded-lg capitalize">
          {report}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Performance;
