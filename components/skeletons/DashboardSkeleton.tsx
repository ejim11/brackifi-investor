import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-[3rem] w-full  py-[1.5rem] xmd:grid-cols-2 sm:grid-cols-1 ">
      {Array.from({ length: 4 }, (v, i) => i).map((i) => (
        <div key={i} className="w-full sm:hidden">
          <div className="flex  flex-col relative z-20 w-full">
            <SkeletonTheme
              baseColor="rgba(0, 0, 0, 1)"
              highlightColor="rgba(67, 104, 80)"
            >
              <div className="w-full h-[15rem] rounded-md mb-[1rem] ">
                <Skeleton count={1} className="h-full" />
              </div>
            </SkeletonTheme>
          </div>
        </div>
      ))}
      <div className="w-full sm:block hidden">
        <div className="flex  flex-col relative z-20 w-full">
          <SkeletonTheme
            baseColor="rgba(0, 0, 0, 1)"
            highlightColor="rgba(67, 104, 80)"
          >
            <div className="w-full h-[25rem] rounded-md mb-[1rem] ">
              <Skeleton count={1} className="h-full" />
            </div>
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
