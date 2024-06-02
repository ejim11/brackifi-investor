import React, { useState } from 'react';
import PlainInputComponent from './PlainInputComponent';
import { FallingLines } from 'react-loader-spinner';
import { useAppSelector, useAppDispatch } from '@/hooks/customHook';
import { toastError, toastSuccess } from '@/utils/helperFns';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';
import { updateInfoDispatch } from '@/actions/investorAction';

const UpdateShareholderForm = () => {
  const dispatch = useAppDispatch();

  const { token }: { token: string } = useAppSelector(
    (state) => state.investor
  );

  // state functions to manage inputs
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [nextOfKinName, setNextOfKinName] = useState<string>('');
  const [nextOfKinEmail, setNextOfKinEmail] = useState<string>('');
  const [nextOfKinAddress, setNextOfKinAddress] = useState<string>('');

  // manage loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetInputs = () => {
    setName('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setNextOfKinName('');
    setNextOfKinEmail('');
    setNextOfKinAddress('');
  };

  const handleUpdateShareholderInfo = (e: any) => {
    e.preventDefault();

    const data: any = {
      name,
      email,
      address,
      phoneNumber,
      nextOfKinName,
      nextOfKinEmail,
      nextOfKinAddress,
    };

    let updatedData: any = {};

    let objectIsActive = false;

    Object.keys(data).forEach((info) => {
      if (data[info]) {
        updatedData[`${info}`] = data[info];
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
          resetInputs
        )
      );
    } else {
      return;
    }
  };

  return (
    <form onSubmit={handleUpdateShareholderInfo}>
      <PlainInputComponent
        inputName="fullName"
        inputType="Text"
        inputPlaceholder="Ejim Favour"
        inputLabel="Full Name"
        value={name}
        setValue={setName}
      />
      <PlainInputComponent
        inputName="email"
        inputType="email"
        inputPlaceholder="ejimfavour@gmail.com"
        inputLabel="Email"
        value={email}
        setValue={setEmail}
      />
      <PlainInputComponent
        inputName="address"
        inputType="text"
        inputPlaceholder="Ontario, Canada"
        inputLabel="address"
        value={address}
        setValue={setAddress}
      />
      <PlainInputComponent
        inputName="phoneNumber"
        inputType="Text"
        inputPlaceholder="07026692653"
        inputLabel="Phone Number"
        value={phoneNumber}
        setValue={setPhoneNumber}
      />
      <PlainInputComponent
        inputName="nextOfKinName"
        inputType="Text"
        inputPlaceholder="Ejim Bethel"
        inputLabel="next of kin name"
        value={nextOfKinName}
        setValue={setNextOfKinName}
      />
      <PlainInputComponent
        inputName="nextOfKinEmail"
        inputType="email"
        inputPlaceholder="bethelejim@gmail.com"
        inputLabel="next of kin email"
        value={nextOfKinEmail}
        setValue={setNextOfKinEmail}
      />
      <PlainInputComponent
        inputName="nextOfKinAddress"
        inputType="text"
        inputPlaceholder="Oklahoma, USA"
        inputLabel="next of kin address"
        value={nextOfKinAddress}
        setValue={setNextOfKinAddress}
      />
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

export default UpdateShareholderForm;
