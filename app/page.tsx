'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/customHook';
import { investorAction } from '@/slices/investorSlice';

export default function Home() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('investorToken');

      const { name, id, email, phoneNumber, address } = JSON.parse(
        window.localStorage.getItem('investorDetails') || '{}'
      );

      dispatch(investorAction.setInvestorToken(storedToken || ''));
      dispatch(
        investorAction.setInvestorDetails({
          name,
          id,
          email,
          phoneNumber,
          address,
        })
      );

      if (!storedToken) {
        router.replace('/auth/login');
      } else {
        router.replace(`/dashboard/${name.toLowerCase().split(' ').join('-')}`);
      }
    }
  }, []);

  return <></>;
}
