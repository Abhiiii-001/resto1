import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/redux/redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './_component/Navbar';

import { Metadata } from 'next';
import metadataData from '@/data/metadata.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: metadataData.global.title,
  description: metadataData.global.description,
  keywords: metadataData.global.keywords,
  authors: metadataData.global.authors,
  creator: metadataData.global.creator,
  publisher: metadataData.global.publisher,
  openGraph: metadataData.global.openGraph as any,
  twitter: metadataData.global.twitter as any,
  robots: metadataData.global.robots as any,
};

import GlobalModal from '@/components/modals/GlobalModal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <StoreProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          
          <GlobalModal />

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </StoreProvider>
      </body>
    </html>
  );
}
