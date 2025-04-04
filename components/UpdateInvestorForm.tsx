import React, { useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useAppSelector, useAppDispatch } from '@/hooks/customHook';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { updateInfoDispatch } from '@/actions/investorAction';
import InputComponent from './InputComponent';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registrationOption } from '@/utils/inputValidators';

const UpdateInvestorForm = () => {
  const dispatch = useAppDispatch();

  type FormData = {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    nextOfKinName: string;
    nextOfKinEmail: string;
    nextOfKinAddress: string;
  };

  const { token }: { token: string } = useAppSelector(
    (state) => state.investor
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
    },
  });

  const resetForm = () => {
    reset({
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
    });
  };

  // manage loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData: any = { ...data };

    let updatedData: any = {};

    let objectIsActive = false;

    Object.keys(formData).forEach((info) => {
      if (formData[info].length > 0) {
        updatedData[`${info}`] = formData[info].trim();
        objectIsActive = true;
      }
    });

    if (objectIsActive) {
      dispatch(
        updateInfoDispatch(
          updatedData,
          token,
          setIsLoading,
          toastSuccess,
          toastError,
          <FaRegCircleCheck className="w-[2.3rem] h-[2.3rem] text-color-primary-1" />,
          <LuBadgeAlert className="w-[2.3rem] h-[2.3rem] red" />,
          resetForm
        )
      );
    } else {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap  w-full justify-between">
        <InputComponent
          placeholder={'Enter full name'}
          type={'text'}
          register={register}
          error={errors}
          name={'name'}
          label="Full Name"
          pl="pl-[1rem]"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          validation={registrationOption.name(false)}
        />
        <InputComponent
          placeholder={'Enter email address'}
          type={'email'}
          register={register}
          error={errors}
          name={'email'}
          pl="pl-[1rem]"
          label="Email"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full "
          validation={registrationOption.email(false)}
        />
        <InputComponent
          placeholder={'Enter phone number'}
          type={'text'}
          register={register}
          error={errors}
          name={'phoneNumber'}
          pl="pl-[1rem]"
          label="Phone Number"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          validation={registrationOption.phoneNumber(false)}
        />
        <InputComponent
          placeholder={'Enter home address'}
          type={'text'}
          register={register}
          error={errors}
          name={'address'}
          pl="pl-[1rem]"
          label="Address"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          validation={registrationOption.address(false)}
        />
        <InputComponent
          placeholder={'Enter next of kin name'}
          type={'text'}
          register={register}
          error={errors}
          name={'nextOfKinName'}
          label="Next of Kin Full Name"
          pl="pl-[1rem]"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          validation={registrationOption.name(false)}
        />
        <InputComponent
          placeholder={'Enter next of kin email'}
          type={'email'}
          register={register}
          error={errors}
          name={'nextOfKinEmail'}
          pl="pl-[1rem]"
          label="Next of Kin Email"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full "
          validation={registrationOption.email(false)}
        />
        <InputComponent
          placeholder={'Enter next of kin address'}
          type={'text'}
          register={register}
          error={errors}
          name={'nextOfKinAddress'}
          pl="pl-[1rem]"
          label="Next of Kin Address"
          containerWidth="w-[45%] xmd:w-[48%] sm:w-full"
          validation={registrationOption.address(false)}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className={`mt-[4rem] py-[1rem] flex justify-center items-center bg-color-primary-1 text-color-white w-full border border-color-primary-1 rounded-lg transition-all duration-300 ease-in ${
          isLoading && 'opacity-75'
        }`}
      >
        {isLoading ? (
          <FallingLines height="25" width="25" color={'white'} visible={true} />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default UpdateInvestorForm;
