'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo2.png';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { useAppSelector } from '@/hooks/customHook';
import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';

const DashboardNav = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { name, id } = useAppSelector((state) => state.investor.details);

  const pathname = usePathname();

  const baseLink: string = `/dashboard/${name
    .toLowerCase()
    .slice()
    .split(' ')
    .join('-')}`;

  const navData = [
    {
      text: 'Portfolio',
      link: baseLink,
    },
    {
      text: 'Invest',
      link: `${baseLink}/invest`,
    },
  ];

  const toggleMenuOpenHandler = () => {
    setMenuOpen((prevState: any) => !prevState);
  };

  const logoutHandler = () => {
    localStorage.removeItem('shareholderToken');
    localStorage.removeItem('shareholderDetails');
    router.replace('/auth/login');
    console.log('logout');
  };

  return (
    <header
      className={`w-full h-[8rem]  ${
        menuOpen ? 'sm:h-auto' : 'sm:h-[7rem] sm:overflow-hidden'
      } px-[5rem] xlg:px-[5rem] xmd:px-[3.5rem]    ssm:px-[1.5rem] flex items-center absolute top-0 left-0 right-0 justify-between bg-[#161616] z-[50] sm:flex-wrap sm:justify-start sm:items-start sm:px-0`}
    >
      <div
        className={` sm:transition-all sm:duration-100 sm:ease-in sm:px-[1.8rem] ssm:px-[1.5rem] flex items-center sm:justify-statrt  sm:w-full sm:h-[7rem] `}
      >
        <Image
          src={logo}
          alt="logo"
          className="mx-auto w-[4rem] h-[4rem] sm:w-[3rem] sm:h-[3rem] sm:mx-0"
        />
        <p className="logo-animation text-color-secondary-1 text-[3rem] sm:text-[2.5rem]  font-nunito font-semibold uppercase ml-[1rem]">
          Brackifi
        </p>
        <div className="hidden sm:block sm:ml-auto ">
          {!menuOpen ? (
            <HiOutlineMenuAlt3
              className="text-color-white w-[3rem] h-[3rem] ssm:w-[2.5rem] ssm:h-[2.5rem]"
              onClick={toggleMenuOpenHandler}
            />
          ) : (
            <MdOutlineClose
              className="text-color-white w-[3rem] h-[3rem] ssm:w-[2.5rem] ssm:h-[2.5rem]"
              onClick={toggleMenuOpenHandler}
            />
          )}
        </div>
      </div>
      <div
        onClick={() => {
          setMenuOpen(false);
        }}
        className={`items-center   sm:text-color-secondary-1 sm:w-full flex   sm:flex sm:flex-col sm:transition-all sm:duration-100 sm:ease-in  ${
          menuOpen ? 'sm:opacity-100' : 'sm:opacity-0 '
        }  `}
      >
        <div className="text-[1.6rem] text-color-primary-2 mr-[3rem] flex items-center sm:flex-col sm:mr-0 sm:w-full">
          {navData.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`mr-[1.5rem] capitalize text-[1.8rem] hover:text-color-secondary-1 transition-all duration-150 ease-in ${
                item.link === pathname
                  ? 'text-color-secondary-1'
                  : 'text-color-white'
              } sm:mr-0 sm:py-[1.5rem] flex sm:border-b sm:border-color-secondary-1 sm:w-full sm:justify-center sm:first:border-t`}
            >
              {item.text}
            </Link>
          ))}
        </div>
        <Link
          href={`${baseLink}/profile`}
          className="rounded-md py-[.5rem] px-[1rem] bg-color-secondary-1 text-color-secondary-2 w-auto flex items-center sm:bg-color-transparent sm:text-color-secondary-1 sm:py-[1.5rem] sm:px-0 sm:w-full sm:justify-center sm:border-b sm:border-color-secondary-1"
        >
          <FaUser className="mr-[1rem]" />
          <p className="text-[1.8rem] font-semibold capitalize">
            {name.split(' ')[0]}
          </p>
        </Link>
        <button
          type="button"
          className="font-semibold text-color-primary-1 bg-color-secondary-1 px-[1rem] py-[.5rem] rounded-md ml-[1rem] sm:bg-color-transparent sm:w-full sm:py-[1.5rem] sm:px-0 sm:ml-0 sm:text-[1.8rem]"
          onClick={logoutHandler}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default DashboardNav;
