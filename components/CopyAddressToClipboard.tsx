'use client';
import React from 'react';
import useClipboard from 'react-use-clipboard';
import { FaRegCopy } from 'react-icons/fa6';

const CopyAddressToClipboard = () => {
  const address = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS || '';
  const [isCopied, setCopied] = useClipboard(address);

  return (
    <div className="flex items-center justify-center sm:flex-col sm:px-[1rem] w-full">
      <p className="text-color-secondary-2 sm:text-wrap sm:text-center sm:w-full">
        {address.slice(0, 30)}...
      </p>
      <button onClick={setCopied} className="ml-[1rem] sm:mr-0">
        {!isCopied ? (
          <FaRegCopy className="text-color-tertiary-1 w-[2rem] h-[2rem]" />
        ) : (
          <p className="text-color-primary-1">Copied!</p>
        )}
      </button>
    </div>
  );
};

export default CopyAddressToClipboard;
