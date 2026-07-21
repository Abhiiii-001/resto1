import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/redux/redux";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Restroo | Smart Restaurant Ordering System",
    template: "%s | Restroo"
  },
  description: "Experience seamless dining with Restroo. View menus, order online, and enjoy the best food from your favorite local restaurants.",
  keywords: ["restaurant", "online ordering", "food delivery", "menu", "dining", "restro", "qr code ordering"],
  authors: [{ name: "Restroo Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://restro.com",
    title: "Restroo | Smart Restaurant Ordering System",
    description: "Experience seamless dining with Restroo. Skip the wait, scan table QR codes, and order instantly.",
    siteName: "Restroo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restroo | Smart Restaurant Ordering System",
    description: "Experience seamless dining with Restroo. Skip the wait, scan table QR codes, and order instantly.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <StoreProvider>
            <div className="h-full bg-richWhite-200 w-full min-h-[100vh]">
              {children}
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
            </div>
        </StoreProvider>
      </body>
    </html>
  );
}