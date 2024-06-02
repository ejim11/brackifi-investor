'use client';
import React from 'react';
import { useAppSelector } from '@/hooks/customHook';
import Redirect from './Redirect';

const ProtectRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token }: any = useAppSelector((state) => state.investor);

  return <>{!!token ? <>{children}</> : <Redirect link="/" token={token} />}</>;
};

export default ProtectRoutes;
