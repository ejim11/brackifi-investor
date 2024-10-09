/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brackifi | Investor',
  description:
    'The future of assets management. We drive a new system of future focused partnerships.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full">
      <div className="w-full bg-color-primary-2 flex  relative flex-col font-nunito">
        {children}
      </div>
    </div>
  );
}
