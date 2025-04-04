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
import UpdateInvestorForm from '@/components/UpdateInvestorForm';

export default function editProfile() {
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
      ? process.env.NEXT_PUBLIC_LOCAL_HOST
      : process.env.NEXT_PUBLIC_WEB_HOST;

  useEffect(() => {
    if (image) setProfileImg(`${imgHost}/${image}`);
  }, []);

  return (
    <motion.div className=" font-nunito ">
      <section className="  rounded-bl-lg rounded-br-lg sm:h-auto ">
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
              width={300}
              height={300}
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
      <section className="flex justify-between mt-[5rem] p-[3rem] smd:p-[0rem]  rounded-lg bg-color-secondary-3 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className=" rounded-lg w-full smd:py-[2rem] px-[1.5rem]"
        >
          <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
            Update Info
          </p>
          <UpdateInvestorForm />
        </motion.div>
      </section>
    </motion.div>
  );
}
