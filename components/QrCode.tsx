'use client';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QrCode = () => {
  const paymentAddress: string = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS
    ? process.env.NEXT_PUBLIC_PAYMENT_ADDRESS
    : '';

  return (
    <div className="max-w-[15rem] max-h-[15rem] p-[.5rem] border border-color-black rounded-md shadow-md">
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={paymentAddress}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default QrCode;
