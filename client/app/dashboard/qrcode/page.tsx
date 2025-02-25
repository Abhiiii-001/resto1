"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Share2 } from "lucide-react";
import Link from "next/link";

const QRPage = () => {
  const [qrCode, setQrCode] = useState("/qr.svg");
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, { useCORS: true });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "QR-Card.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-8">
      {/* Breadcrumb */}
      <div className="w-full max-w-4xl self-start mb-6">
        <div className="flex flex-wrap items-center gap-2 text-[14px] sm:text-[16px] font-semibold text-gray-400">
          <Link href={"/"} className="hover:text-gray-600">Home</Link>
          <span>{">"}</span>
          <Link href={"/dashboard"} className="hover:text-gray-600">Dashboard</Link>
          <span>{">"}</span>
          <Link href={"/dashboard/qrcode"} className="hover:text-gray-600">QR-Page</Link>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 self-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-400 transition-all duration-200 p-2 rounded-lg flex items-center">
          <Share2 size={16} className="mr-2" /> Share
        </button>
        <button className="bg-blue-500 hover:bg-blue-400 transition-all duration-200 p-2 rounded-lg flex items-center">
          Live Preview
        </button>
      </div>

      {/* QR Card */}
      <div ref={cardRef} className="border-b-[15px]  border-gradient-to-t from-blue-700 to-blue-400 rounded-xl border-blue-500  bg-white text-gray-800 p-6 rounded-md shadow-lg w-[25rem] max-w-xs sm:max-w-md md:max-w-lg text-center relative">
        <h3 className="absolute top-4 left-4 text-sm font-semibold">Restro</h3>

        {/* Logo */}
        <div className="w-24 h-24 mx-auto mb-4 border-2 border-gray-600 rounded-full flex items-center justify-center">
          Logo
        </div>

        {/* Restaurant Name */}
        <h2 className="text-lg font-semibold mb-4 flex justify-center items-center bg-blue-300 rounded-[19px]">Name of Restaurant</h2>

        {/* QR Code (Using <img> instead of <Image>) */}
        <div className="bg-gray-100 pt-4 pb-4  rounded-lg flex items-center justify-center flex-col">
          <img className="" src={qrCode} alt="QR Code" width="215" height="215" />
          <p className="text-lg font-semibold">"Hungry? Scan. Order. Enjoy!"</p>
        </div>
      </div>

      {/* Download Button (Outside the Card) */}
      <button onClick={handleDownload} className="mt-4 flex items-center justify-center bg-gray-300 hover:bg-gray-600 text-black hover:text-white transition-all duration-200 p-2 rounded-lg">
        <Download size={16} className="mr-2" /> Download QR Card
      </button>
    </div>
  );
};

export default QRPage;
