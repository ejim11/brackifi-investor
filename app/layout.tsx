import type { Metadata } from 'next';
import './globals.css';
import { Nunito, DM_Sans } from 'next/font/google';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import ReduxProviderWrapper from '@/components/ReduxProviderWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Brackifi | Investor',
  description: 'FutureFocus Partnerships',
};

const nunito: NextFontWithVariable = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const dmSans: NextFontWithVariable = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmSans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${dmSans.variable}`}>
        <ReduxProviderWrapper>
          {children}
          <ToastContainer />
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
