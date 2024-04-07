'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { shareholder } from '@/axios.config';

const Redirect = ({ link, token }: { link: string; token: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(link);
  }, [token]);
  return <></>;
};

export default Redirect;
