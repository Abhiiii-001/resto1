'use client';
import React, { useEffect } from 'react';

type Props = {};

const Loader = (props: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className="no-scroll absolute inset-0 flex h-screen w-screen items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="loader"></div>
      <div className="absolute rotate-[-20deg] animate-pulse font-serif font-semibold text-[#F5A463]">
        Restroo
      </div>
    </div>
  );
};

export default Loader;
