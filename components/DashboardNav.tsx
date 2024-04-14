'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo2.png';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { useAppSelector } from '@/hooks/customHook';
import { usePathname, useRouter } from 'next/navigation';

const DashboardNav = () => {
  const router = useRouter();

  const { name, id } = useAppSelector((state) => state.shareholder.details);

  const pathname = usePathname();

  console.log(pathname);

  const baseLink: string = `/dashboard/${[
    ...name.toLowerCase().split(' '),
    id.slice(0, 5),
  ].join('-')}`;

  const navData = [
    {
      text: 'Portfolio',
      link: baseLink,
    },
    {
      text: 'Shareholding',
      link: `${baseLink}/manage-shares`,
    },
  ];

  const logoutHandler = () => {
    localStorage.removeItem('shareholderToken');
    localStorage.removeItem('shareholderDetails');
    router.replace('/auth/login');
    console.log('logout');
  };

  return (
    <header
      className={`w-full h-[8rem] px-[5rem] xlg:px-[5rem] xmd:px-[3.5rem] smd:px-[2.5rem]   ssm:px-[1.5rem] flex items-center absolute top-0 left-0 right-0 justify-between bg-[#161616]`}
    >
      <div className="flex items-center ">
        <Image
          src={logo}
          alt="logo"
          className="mx-auto w-[4rem] h-[4rem] smd:w-[3.5rem] smd:h-[3.5rem] ssm:w-[3rem] ssm:h-[3rem]"
        />
        <p className="logo-animation text-color-secondary-1 text-[3rem] smd:text-[2.8rem] ssm:text-[2.5rem] font-nunito font-semibold uppercase ml-[1rem]">
          Brackifi
        </p>
      </div>
      <div className="flex items-center">
        <div className="text-[1.7rem] text-color-primary-2 mr-[3rem]">
          {navData.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`mr-[1rem] capitalize text-[1.8rem] hover:text-color-secondary-1 transition-all duration-150 ease-in ${
                item.link === pathname
                  ? 'text-color-secondary-1'
                  : 'text-color-white'
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>
        <Link
          href={`/dashboard/${[
            ...name.toLowerCase().split(' '),
            id.slice(0, 5),
          ].join('-')}/profile`}
          className="rounded-md py-[.5rem] px-[1rem] bg-color-secondary-1 text-color-secondary-2 w-auto flex items-center"
        >
          <FaUser className="mr-[1rem]" />
          <p className="text-[1.8rem] font-semibold">{name.split(' ')[0]}</p>
        </Link>
        <button
          type="button"
          className="font-semibold text-color-primary-1 bg-color-secondary-1 px-[1rem] py-[.5rem] rounded-md ml-[1rem] "
          onClick={logoutHandler}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default DashboardNav;
