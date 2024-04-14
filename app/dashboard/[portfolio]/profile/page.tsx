'use client';
import React, { useState } from 'react';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import UpdateShareholderInfo from '@/components/UpdateShareholderForm';
import noUserImg from '../../../../assets/image_255.svg';
import Image from 'next/image';
import { fileHandler } from '@/utils/helperFns';
import { FaRegEdit } from 'react-icons/fa';
import { useAppSelector } from '@/hooks/customHook';

const page = () => {
  const { name, email, phoneNumber, address } = useAppSelector(
    (state) => state.shareholder.details
  );

  console.log(phoneNumber, address);

  const [profileImg, setProfileImg] = useState<any>(noUserImg);
  const [profileImgObj, setProfileImgObj] = useState<any>();

  const setProfileImage = (e: any) => {
    setProfileImg(fileHandler(e.target.files[0]));
    setProfileImgObj(e.target.files[0]);
  };

  return (
    <div className="min-h-screen font-nunito">
      <section className="bg-portfolio-bg bg-no-repeat bg-cover bg-center h-[40rem] bg-color-primary-1 rounded-bl-lg rounded-br-lg pt-[10rem] px-[10rem]">
        <div className="flex w-full h-full items-center">
          <label
            htmlFor="profileImg"
            className=" w-[20rem] h-[20rem] bg-color-secondary-1 mr-[3rem] rounded-full flex items-center justify-center relative"
          >
            <Image
              src={profileImg}
              alt="profile-img"
              className="w-full h-full rounded-full object-cover"
              width={10}
              height={10}
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
          <div className="w-[50rem]  bg-color-secondary-1 p-[1.5rem] rounded-lg font-nunito capitalize">
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
        </div>
      </section>
      <section className="flex justify-between px-[10rem] py-[5rem] bg-color-primary-2">
        <div className="p-[2.5rem] bg-color-white rounded-lg w-[45%]">
          <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
            Update Info
          </p>
          <UpdateShareholderInfo />
        </div>
        <div className="p-[2.5rem] bg-color-white rounded-lg w-[45%] self-start">
          <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
            Update Password
          </p>
          <UpdatePasswordForm />
        </div>
      </section>
    </div>
  );
};

export default page;
