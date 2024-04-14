'use client';
import React from 'react';

const PlainInputComponent = ({
  inputName,
  inputType,
  inputPlaceholder,
  inputLabel,
  value,
  setValue,
}: {
  inputName: string;
  inputType: string;
  inputPlaceholder: string;
  inputLabel: string;
  value: any;
  setValue: Function;
}) => {
  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col w-full mb-[1.5rem] text-color-secondary-2">
      <label htmlFor={inputName} className="mb-[.5rem] capitalize">
        {inputLabel}
      </label>
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChangeHandler}
        className="border border-color-primary-1 px-[1.5rem] py-[1rem] rounded-md ring-0 outline-0 focus:ring-0 focus:outline-0"
        id={inputName}
        name={inputName}
      />
    </div>
  );
};

export default PlainInputComponent;
