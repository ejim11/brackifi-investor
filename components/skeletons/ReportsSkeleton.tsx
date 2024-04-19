'use client';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReportsSkeleton = () => {
  return (
    <div className="p-[1rem] flex ">
      <SkeletonTheme
        baseColor="#555335"
        highlightColor="rgba(210, 183, 116, 1)"
      >
        <div className="w-[10rem] h-[10rem] rounded-md">
          <Skeleton count={1} className="h-full" />
        </div>

        <div className="flex-1 h-[1.5rem] mx-[1rem]">
          <Skeleton count={4} className="h-full" />
        </div>

        <div className="w-[8rem] h-[2.5rem] self-center">
          <Skeleton count={1} className="h-full" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default ReportsSkeleton;
