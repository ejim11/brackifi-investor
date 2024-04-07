'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/customHook';
import { shareholderAction } from '@/slices/shareholderSlice';

export default function Home() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('shareholderToken');

      const { name, id } = JSON.parse(
        window.localStorage.getItem('shareholderDetails') || '{}'
      );

      dispatch(shareholderAction.setShareHolderToken(storedToken || ''));
      dispatch(shareholderAction.setShareholderDetails({ name, id }));

      if (!storedToken) {
        router.replace('/auth/login');
      } else {
        router.replace(
          `/dashboard/${[...name.toLowerCase().split(' '), id.slice(0, 5)].join(
            '-'
          )}`
        );
      }
    }
  }, []);

  return <></>;
}
