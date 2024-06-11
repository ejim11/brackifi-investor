'use client';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GraphSkeleton = () => {
  return (
    <div className="p-[1rem] flex  bg-color-light-black mb-[1.5rem] w-full h-full">
      <SkeletonTheme
        baseColor="#555335"
        highlightColor="rgba(210, 183, 116, 1)"
      >
        <div className="w-full h-full rounded-md">
          <Skeleton count={1} className="h-full" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default GraphSkeleton;
