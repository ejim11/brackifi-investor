'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Redirect = ({ link, token }: { link: string; token: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(link);
  }, [token]);
  return <></>;
};

export default Redirect;
