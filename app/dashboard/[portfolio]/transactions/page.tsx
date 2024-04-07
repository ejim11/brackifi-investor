'use client';
import React from 'react';
import DashboardFirstSec from '@/components/DashboardFirstSec';

const page = () => {
  return (
    <div>
      <section className="bg-portfolio-bg bg-no-repeat bg-cover bg-center h-[40rem] bg-color-primary-1 rounded-bl-lg rounded-br-lg pt-[10rem] px-[10rem]">
        <DashboardFirstSec />
      </section>
    </div>
  );
};

export default page;
