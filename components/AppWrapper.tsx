'use client';
import { autoLogout } from '@/actions/investorAction';
import { useAppDispatch, useAppSelector } from '@/hooks/customHook';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const dispatchFn = useAppDispatch();

  const { token, isLoggedIn, remainingTime, details } = useAppSelector(
    (state) => state.investor
  );

  const { name } = details;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { name: storedName } = JSON.parse(
        window.localStorage.getItem('investorDetails') || '{}'
      );
      let navName = name ? name : storedName;

      if (isLoggedIn && token && navName) {
        router.replace(
          `/dashboard/${navName.toLowerCase().slice().split(' ').join('-')}`
        );
      } else {
        router.replace('/auth/login');
      }
    }
  }, [token, isLoggedIn, router]);

  useEffect(() => {
    console.log(remainingTime);
    if (remainingTime) {
      dispatchFn(autoLogout(remainingTime));
    }
  }, [dispatchFn, remainingTime]);

  return <div suppressHydrationWarning>{children}</div>;
};

export default AppWrapper;
