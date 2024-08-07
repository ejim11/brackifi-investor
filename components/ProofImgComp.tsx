import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChangeEventHandler } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const ProofImgComp = ({
  name,
  img,
  setImg,
  text,
  err,
  fileName,
  setFileName,
}: {
  name: string;
  img: string;
  setImg: ChangeEventHandler<HTMLInputElement>;
  text: string;
  err: boolean;
  fileName: string;
  setFileName: Function;
}) => {
  return (
    <div className="w-[45%] sm:w-full sm:mb-[2rem]">
      <p className="text-color-secondary-2 mb-[1rem] font-nunito font-medium">
        {name} <span className="text-[1.2rem]">(jpg, png, pdf)</span>
      </p>
      <label
        htmlFor={name}
        className="border p-[1rem] border-color-primary-1 w-full  flex justify-center items-center rounded-md h-[15rem] cursor-pointer flex-col"
      >
        {img ? (
          <Image
            src={img}
            alt="proof of identity img"
            width={8}
            height={8}
            className="w-[5rem] h-[5rem]"
          />
        ) : (
          <p className=" text-center  p-[0.5rem] break-all bg-color-primary-3 text-color-primary-1 rounded-md border border-color-primary-1 text-wrap">
            {fileName}
          </p>
        )}
        <input
          type="file"
          className="hidden"
          accept="*"
          onChange={setImg}
          id={name}
        />
        <label
          htmlFor={name}
          className="text-color-white bg-color-primary-1 rounded-md py-[.5rem] px-[1rem] text-[1.6rem] mt-[2rem] cursor-pointer text-center"
        >
          {!fileName ? 'Upload File' : 'Change File'}
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
