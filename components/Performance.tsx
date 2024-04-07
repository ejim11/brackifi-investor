'use client';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Performance = ({
  percentage,
  title,
}: {
  percentage: number;
  title: string;
}) => {
  return (
    <div className="shadow-lg w-[48%]  h-full rounded-lg flex items-center flex-col p-[1rem]">
      <div className="w-[10rem] h-[10rem]">
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
            pathColor: `rgba(67, 104, 80)`,
            textColor: 'rgba(67, 104, 80)',
            trailColor: 'rgba(0, 0, 0,0.5)',
            backgroundColor: 'rgba(0, 0, 0)',
          })}
        />
      </div>
      <div>
        <p className="text-[1.8rem] text-color-primary-1 font-nunito font-bold uppercase mt-[2rem] text-center">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Performance;
