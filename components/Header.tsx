'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo2.png';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname: string = usePathname();

  return (
    <header
      className={` h-[8rem] text-[1.6rem]  w-full flex items-center px-[10rem] xlg:px-[5rem] xmd:px-[3.5rem] smd:px-[2.5rem] smd:shadow-md  ssm:px-[1.5rem] transition-all duration-150 ease-in relative z-20 ${
        pathname.includes('add-member') ? 'bg-color-primary-1' : ''
      }`}
    >
      <div className="flex items-center cursor-pointer">
        <Image
          src={logo}
          alt="logo"
          className="mx-auto w-[4rem] h-[4rem] smd:w-[3.5rem] smd:h-[3.5rem] ssm:w-[3rem] ssm:h-[3rem]"
        />
        <p className="logo-animation text-color-secondary-1 text-[3rem] smd:text-[2.8rem] ssm:text-[2.5rem] font-nunito font-semibold uppercase ml-[1rem]">
          Brackifi
        </p>
      </div>
    </header>
  );
};

export default Header;
