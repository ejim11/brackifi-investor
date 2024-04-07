/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import DashboardFirstSec from '@/components/DashboardFirstSec';
import DashboardNav from '@/components/DashboardNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brackifi',
  description:
    'The future of assets management. We drive a new system of future focused partnerships.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <DashboardNav />
      {children}
    </div>
  );
}
