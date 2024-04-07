import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChangeEventHandler } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import noImg from '../assets/no-image-svgrepo-com.svg';

const ProofImgComp = ({
  name,
  img,
  setImg,
  text,
  err,
}: {
  name: string;
  img: StaticImageData;
  setImg: ChangeEventHandler<HTMLInputElement>;
  text: string;
  err: boolean;
}) => {
  return (
    <div className="w-[45%] ">
      <p className="text-color-secondary-2 mb-[1rem] font-nunito font-medium">
        {name}
      </p>
      <label
        htmlFor={name}
        className="border border-color-primary-1 w-full  flex justify-center items-center rounded-md h-[15rem] cursor-pointer flex-col "
      >
        <Image
          src={img || noImg}
          alt="proof of identity img"
          width={8}
          height={8}
          className="w-[5rem] h-[5rem]"
        />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={setImg}
          id={name}
        />
        <label
          htmlFor={name}
          className="text-color-white bg-color-primary-1 rounded-md py-[.5rem] px-[1rem] text-[1.6rem] mt-[2rem] cursor-pointer text-center"
        >
          Upload Image
        </label>
      </label>
      <div className="text-color-secondary-2 mt-[1rem] flex items-center">
        <AiOutlineInfoCircle className="w-[1.5rem] h-[1.5rem]" />
        <p className="text-[1.4rem] ml-[.5rem]">{text}</p>
      </div>
      {err && (
        <small className="text-color-red">{`Please provide a ${name}.`}</small>
      )}
    </div>
  );
};

export default ProofImgComp;
