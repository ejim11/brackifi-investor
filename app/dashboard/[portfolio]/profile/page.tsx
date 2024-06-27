'use client';
import React, { useEffect, useState } from 'react';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import UpdateShareholderInfo from '@/components/UpdateInvestorForm';
import noUserImg from '../../../../assets/image_255.svg';
import Image from 'next/image';
import { fileHandler } from '@/utils/helperFns';
import { FaRegEdit } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { updateInvestorProfileImgDispatch } from '@/actions/investorAction';
import { motion } from 'framer-motion';

const page = () => {
  const { name, email, phoneNumber, address, image } = useAppSelector(
    (state) => state.investor.details
  );

  const token = useAppSelector((state: any) => state.investor.token);

  const dispatch = useAppDispatch();

  const [profileImg, setProfileImg] = useState<any>(noUserImg);
  const [profileImgObj, setProfileImgObj] = useState<any>();

  const setProfileImage = (e: any) => {
    dispatch(updateInvestorProfileImgDispatch(token, e.target.files[0]));
    setProfileImg(fileHandler(e.target.files[0]));
    // setProfileImgObj(e.target.files[0]);
  };

  const imgHost =
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? `http://127.0.0.1:3009`
      : 'https://brackifi-be.onrender.com';

  useEffect(() => {
    if (image) setProfileImg(`${imgHost}/${image}`);
  }, []);

  return (
    <motion.div className="overflow-auto h-screen font-nunito">
      <section className="bg-portfolio-bg bg-no-repeat bg-cover bg-center h-[40rem] bg-color-primary-1 rounded-bl-lg rounded-br-lg pt-[10rem] px-[10rem] sm:h-auto xlg:px-[3.5rem] sm:px-[2.5rem]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="flex w-full h-full items-center sm:flex-col"
        >
          <label
            htmlFor="profileImg"
            className=" w-[20rem] h-[20rem] sm:mb-[2rem] sm:mr-0 bg-color-secondary-1 mr-[3rem] rounded-full flex items-center justify-center relative"
          >
            <Image
              src={profileImg}
              alt="profile-img"
              className="w-full h-full rounded-full object-cover"
              width={100}
              height={100}
            />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={setProfileImage}
              id={'profileImg'}
            />
            <div className="absolute bottom-0 right-0 bg-color-tertiary-1 w-[5rem] h-[5rem] flex items-center justify-center rounded-full cursor-pointer">
              <FaRegEdit className="w-[2.3rem] h-[2.3rem] text-color-white" />
            </div>
          </label>
          <div className="w-[50rem] xlg:flex-1 sm:w-full sm:mb-[3rem]   bg-color-secondary-1 p-[1.5rem] rounded-lg font-nunito capitalize">
            <p className="text-[1.8rem] font-semibold text-color-secondary-2 mb-[.5rem]">
              Full Name: <span>{name}</span>
            </p>
            <p className="text-[1.8rem] font-semibold text-color-secondary-2 mb-[.5rem]">
              Email: <span>{email}</span>
            </p>
            <p className="text-[1.8rem] font-semibold text-color-secondary-2 mb-[.5rem]">
              Address: <span>{address}</span>
            </p>
            <p className="text-[1.8rem] font-semibold text-color-secondary-2 ">
              Phone Number: <span>{phoneNumber}</span>
            </p>
          </div>
        </motion.div>
      </section>
      <section className="flex justify-between px-[10rem] py-[5rem] bg-color-primary-2 xlg:px-[3.5rem] sm:flex-col sm:px-[2.5rem]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="p-[2.5rem] bg-color-white rounded-lg w-[45%] xlg:w-[48%] sm:w-full sm:p-[1.5rem]"
        >
          <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
            Update Info
          </p>
          <UpdateShareholderInfo />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
          className="p-[2.5rem] bg-color-white rounded-lg w-[45%] self-start  xlg:w-[48%] sm:w-full sm:mt-[3rem] sm:p-[1.5rem]"
        >
          <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
            Update Password
          </p>
          <UpdatePasswordForm />
        </motion.div>
      </section>
    </motion.div>
  );
};

export default page;
