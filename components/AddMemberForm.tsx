'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';
import InputComponent from './InputComponent';
import { fileHandler, toastError, toastSuccess } from '@/utils/helperFns';
import ProofImgComp from './ProofImgComp';
import { useAppDispatch } from '@/hooks/customHook';
import { createInvestorDispatch } from '@/actions/investorAction';
import { FallingLines } from 'react-loader-spinner';
import noImg from '../assets/no-image-svgrepo-com.svg';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { IoMdLock } from 'react-icons/io';
import { useRouter } from 'next/navigation';

type FormData = {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  proofOfIdentity: string;
  proofOfAddress: string;
  nextOfKinName: string;
  nextOfKinEmail: string;
  nextOfKinAddress: string;
  password: string;
  confirmPassword: string;
};

const AddMemberForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proofOfIdentityImg, setProofOfIdentityImg] = useState<any>(noImg);
  const [proofOfIdentityFileName, setProofOfIdentityFileName] =
    useState<string>('');
  const [proofOfIdentityImgObj, setProofOfIdentityImgObj] = useState<any>();
  const [proofOfAddressImg, setProofOfAddressImg] = useState<any>(noImg);
  const [proofOfAddressImgObj, setProofOfAddressImgObj] = useState<any>();
  const [proofOfAddressFileName, setProofOfAddressFileName] =
    useState<string>('');
  const [identityErr, setIdentityErr] = useState<boolean>(false);
  const [addressErr, setAddressErr] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      proofOfAddress: '',
      proofOfIdentity: ' ',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
      password: '',
      confirmPassword: '',
    },
  });

  const proofOfIdentityImgHandler = (e: { target: { files: any } }) => {
    if (e.target.files[0].type.includes('image')) {
      setProofOfIdentityImg(fileHandler(e.target.files[0]));
    } else {
      setProofOfIdentityImg(undefined);
      setProofOfIdentityFileName(e.target.files[0].name);
    }

    setProofOfIdentityImgObj(e.target.files[0]);
  };

  const proofOfAddressImgHandler = (e: { target: { files: any } }) => {
    if (e.target.files[0].type.includes('image')) {
      setProofOfAddressImg(fileHandler(e.target.files[0]));
    } else {
      setProofOfAddressImg(undefined);
      setProofOfAddressFileName(e.target.files[0].name);
    }
    setProofOfAddressImgObj(e.target.files[0]);
  };

  const resetForm = () => {
    reset({
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      proofOfIdentity: '',
      proofOfAddress: '',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
      password: '',
      confirmPassword: '',
    });

    setProofOfIdentityImg(noImg);
    setProofOfIdentityImgObj(noImg);
    router.push('/auth/login');

    setProofOfAddressImg(noImg);
    setProofOfAddressImgObj(noImg);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!proofOfAddressImg && !proofOfAddressFileName) {
      setAddressErr(true);
      return;
    } else {
      setAddressErr(false);
    }
    if (!proofOfIdentityImg && !proofOfIdentityFileName) {
      setIdentityErr(true);
      return;
    } else {
      setIdentityErr(false);
    }
    // if (!proofOfAddressImg || !proofOfIdentityImg) {
    //   return;
    // }
    if (data.password !== data.confirmPassword) {
      console.log(data.confirmPassword);
      toastError(
        `Passwords don't match `,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] text-color-red" />
      );
      return;
    }

    const potentialInvestorData = {
      name: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      proofOfIdentityFile: proofOfIdentityImgObj,
      proofOfAddressFile: proofOfAddressImgObj,
      nextOfKinName: data.nextOfKinName,
      nextOfKinEmail: data.nextOfKinEmail,
      nextOfKinAddress: data.nextOfKinAddress,
      password: data.password,
      passwordConfirm: data.confirmPassword,
    };

    dispatch(
      createInvestorDispatch(
        potentialInvestorData,
        setIsLoading,
        toastSuccess,
        toastError,
        <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
        <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />,
        resetForm
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div>
        <p className="mb-[1.5rem] text-[1.8rem] text-color-secondary-1">
          Shareholder Info
        </p>
        <div className="flex flex-wrap  w-full justify-between">
          <InputComponent
            placeholder={'Adams West'}
            type={'text'}
            register={register}
            error={errors}
            name={'fullName'}
            label="Full Name"
            pl="pl-[1rem]"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.name}
          />
          <InputComponent
            placeholder={'adams@gmail.com'}
            type={'email'}
            register={register}
            error={errors}
            name={'email'}
            pl="pl-[1rem]"
            label="Email"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.email}
          />
          <InputComponent
            placeholder={'0204-9384-8393'}
            type={'text'}
            register={register}
            error={errors}
            name={'phoneNumber'}
            pl="pl-[1rem]"
            label="Phone Number"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.phoneNumber}
          />
          <InputComponent
            placeholder={'Ibiza, Spain'}
            type={'text'}
            register={register}
            error={errors}
            name={'address'}
            pl="pl-[1rem]"
            label="Address"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.address}
          />
          <div className="w-full mt-[1rem] mb-[3rem] flex justify-between  sm:flex-col">
            <ProofImgComp
              name="Proof of Identity"
              img={proofOfIdentityImg}
              fileName={proofOfIdentityFileName}
              setFileName={setProofOfIdentityFileName}
              setImg={proofOfIdentityImgHandler}
              text="Passports, Drivers license, Id card, Birth certificate, etc"
              err={identityErr}
            />
            <ProofImgComp
              fileName={proofOfAddressFileName}
              setFileName={setProofOfAddressFileName}
              name="Proof of Address"
              img={proofOfAddressImg}
              setImg={proofOfAddressImgHandler}
              text="Bank statement, Utility, etc"
              err={addressErr}
            />
          </div>
        </div>
      </div>
      <div className="mt-[2rem]">
        <p className="mb-[1.5rem] text-[1.8rem] text-color-secondary-1">
          Next of Kin Info
        </p>
        <div className="flex flex-wrap  w-full justify-between">
          <InputComponent
            placeholder={'Sandra Jones'}
            type={'text'}
            register={register}
            error={errors}
            name={'nextOfKinName'}
            label="Full Name"
            pl="pl-[1rem]"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.name}
          />
          <InputComponent
            placeholder={'sandraj@gmail.com'}
            type={'email'}
            register={register}
            error={errors}
            name={'nextOfKinEmail'}
            pl="pl-[1rem]"
            label="Email"
            containerWidth="w-[45%] smd:w-[48%] sm:w-full"
            validation={registrationOption.email}
          />
        </div>
        <InputComponent
          placeholder={'Ibiza, Spain'}
          type={'text'}
          register={register}
          error={errors}
          name={'nextOfKinAddress'}
          pl="pl-[1rem]"
          label="Address"
          containerWidth="w-[45%] smd:w-[48%] sm:w-full"
          validation={registrationOption.address}
        />
      </div>
      <div className="flex justify-between mt-[2rem] sm:flex-col">
        <InputComponent
          placeholder={'Password'}
          label="Password"
          type={'password'}
          register={register}
          error={errors}
          name={'password'}
          validation={registrationOption.password}
          containerWidth="w-[45%] smd:w-[48%] sm:w-full"
          icon={
            <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
          }
        />
        <InputComponent
          placeholder={'Confirm Password'}
          label="Confirm Password"
          type={'password'}
          register={register}
          error={errors}
          name={'confirmPassword'}
          validation={registrationOption.password}
          containerWidth="w-[45%] smd:w-[48%] sm:w-full"
          icon={
            <IoMdLock className="absolute w-[2.2rem] h-[2.2rem] top-[1rem] left-[1rem] text-color-primary-1" />
          }
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className={`mt-[4rem] py-[1rem] flex justify-center items-center bg-color-primary-1 text-color-white w-auto px-[2rem] border border-color-primary-1 rounded-lg transition-all duration-300 ease-in sm:w-full ${
          isLoading && 'opacity-75'
        }`}
      >
        {isLoading ? (
          <FallingLines height="20" width="20" color={'white'} visible={true} />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default AddMemberForm;
