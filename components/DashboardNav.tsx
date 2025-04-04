'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo2.png';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdOutlineChevronRight, MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { userLogout } from '@/actions/investorAction';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { PiHandWithdraw } from 'react-icons/pi';
import { LuHouse, LuUsersRound } from 'react-icons/lu';
import { FiLock } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';

const DashboardNav: React.FC<{ children: ReactNode }> = ({ children }) => {
  const iconClassname = 'text-color-current w-[2rem] h-[2rem] mr-[2rem] ';

  const [expanded, setExpanded] = useState<false | number>(false);

  const dispatch = useAppDispatch();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { name } = useAppSelector((state) => state.investor.details);

  const pathname = usePathname();

  const baseLink: string = `/dashboard/${name
    .toLowerCase()
    .slice()
    .split(' ')
    .join('-')}`;

  const data = [
    {
      title: 'Dashboard',
      link: baseLink,
      icon: <LuHouse className={iconClassname} data-close="close" />,
    },
    {
      title: 'Investment Management',
      subTitle: 'Invest',
      icon: <FaMoneyBillAlt className={iconClassname} />,
      links: [
        {
          text: 'deposit',
          link: `${baseLink}/deposit`,
        },
        {
          text: 'investments',
          link: `${baseLink}/investments`,
        },
      ],
    },
    {
      title: 'Account Management',
      subTitle: 'Account settings',
      icon: <FiLock className={iconClassname} data-close="close" />,
      links: [
        {
          text: 'edit profile',
          link: `${baseLink}/edit-profile`,
        },
        {
          text: 'change password',
          link: `${baseLink}/change-password`,
        },
      ],
    },

    {
      title: 'End Session',
      subTitle: 'Logout',
      funcText: 'logout',

      icon: <AiOutlinePoweroff className={iconClassname} data-close="close" />,
    },
  ];

  const toggleMenuOpenHandler = () => {
    setMenuOpen((prevState: any) => !prevState);
  };

  const logoutHandler = () => {
    setMenuOpen(false);
    dispatch(userLogout());
  };

  const closeMenuModalHandler = (e: any) => {
    // e.stopPropagation();
    if (e.target.dataset.close) {
      setMenuOpen(false);
    }
  };

  return (
    <div>
      <header className="h-[7rem] flex items-center px-[3rem] bg-black">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            priority
            width={50}
            height={50}
            className="w-[4rem] h-[4rem]"
          />
          <h1 className="capitalize flex text-[2.2rem] ml-[.5rem] font-bold text-color-secondary-1">
            BRACKIFI
          </h1>
        </div>
        <button
          type="button"
          className="hidden xlg:block ml-auto"
          onClick={toggleMenuOpenHandler}
        >
          {!menuOpen ? (
            <HiOutlineMenuAlt3 className="w-[3rem] h-[3rem] text-white" />
          ) : (
            <MdOutlineClose className="w-[3rem] h-[3rem] text-white" />
          )}
        </button>
      </header>
      <div className="w-full h-[calc(100vh-7rem)] flex">
        <div
          data-close="close"
          onClick={closeMenuModalHandler}
          className={`w-[30rem] h-full xlg:fixed xlg:top-[7rem] xlg:h-[calc(100vh-7rem)]  xlg:bottom-0 xlg:left-0 xlg:right-0 xlg:z-[60] xlg:bg-[rgba(0,0,0,0.5)] xlg:w-full transition-all duration-150 ease-in ${
            menuOpen ? 'xlg:translate-x-0' : 'xlg:-translate-x-[100%]'
          }  `}
        >
          <div className="h-full w-full xlg:w-[40%]  sm:w-[70%] flex flex-col bg-black">
            {data.map((item: any, index: number) => {
              if (item.link) {
                return (
                  <Link
                    href={item.link}
                    data-close="close"
                    key={item.title}
                    className={`flex items-center p-[1.5rem] border-l-[1rem] ${
                      pathname === item.link
                        ? ' border-color-secondary-3 text-color-secondary-3 '
                        : 'border-black text-white hover:bg-slate-800  '
                    }`}
                  >
                    {item.icon}
                    <span data-close="close">{item.title}</span>
                  </Link>
                );
              }

              if (item.funcText) {
                return (
                  <div
                    key={item.title}
                    className=" pl-[1rem] pb-[2rem] mt-auto"
                  >
                    <p className="p-[1.5rem] uppercase text-[1.3rem] text-gray-400">
                      {item.title}
                    </p>
                    <button
                      className="flex items-center p-[1rem] text-white hover:bg-slate-800 w-full"
                      onClick={logoutHandler}
                    >
                      <div className="">{item.icon}</div>
                      <span className="">{item.subTitle}</span>
                    </button>
                  </div>
                );
              }

              if (item.links) {
                return (
                  <div key={item.title} className="bg-black">
                    <p className="pl-[2.5rem] py-[1.5rem] pr-[1.5rem] uppercase text-[1.3rem] text-gray-400">
                      {item.title}
                    </p>
                    <div
                      className={`border-l-[1rem] ${
                        pathname.includes(item.links[0].link) ||
                        pathname.includes(item.links[1].link)
                          ? 'border-x-color-secondary-3'
                          : 'border-black'
                      }`}
                    >
                      <div
                        className="flex items-center px-[1.5rem] pb-[1rem] text-white cursor-pointer"
                        onClick={() => {
                          setExpanded(index === expanded ? false : index);
                        }}
                      >
                        {item.icon}
                        <span>{item.subTitle}</span>
                        <MdOutlineChevronRight
                          className={`w-[1.8rem] h-[1.8rem] ml-auto transition-all duration-300 ease-in-out ${
                            index === expanded ? 'rotate-90' : 'rotate-0'
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {index === expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="flex flex-col pl-[5.5rem] capitalize bg-slate-950"
                          >
                            {item.links.map((link: any) => (
                              <Link
                                key={link.link}
                                href={link.link}
                                data-close="close"
                                className={`block py-[1rem] ${
                                  pathname === `${link.link}`
                                    ? 'text-color-secondary-3'
                                    : 'text-white'
                                }`}
                              >
                                {link.text}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="flex-1 bg-color-secondary-2 p-[3rem] h-full flex flex-col overflow-y-auto">
          {children}

          <div className="mt-auto">
            <p className="py-[1rem] bg-color-secondary-1 text-color-secondary-2 text-center mt-[4rem]">
              © Brackifi | 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
