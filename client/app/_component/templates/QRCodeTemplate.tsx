import React from 'react';
import Image from 'next/image';
import { MapPin, Smartphone, Wifi } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeTemplateProps {
  downloadQrRef: React.RefObject<HTMLDivElement | null>;
  restaurantData: any;
  qrCodeDataUrl: string;
}

export default function QRCodeTemplate({
  downloadQrRef,
  restaurantData,
  qrCodeDataUrl,
}: QRCodeTemplateProps) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <div
        ref={downloadQrRef as React.RefObject<HTMLDivElement>}
        style={{ width: '650px', backgroundColor: '#ffffff', padding: '40px' }}
        className="flex flex-col items-center justify-center font-sans"
      >
        {/* Restaurant Header */}
        <div className="mb-6 w-full flex flex-col items-center text-center">
          <div className="relative mb-4 h-28 w-28">
            <div className="h-full w-full rounded-full overflow-hidden border border-gray-100 shadow-sm relative">
              <Image
                src={restaurantData?.thumbnail || '/placeholder.svg'}
                alt={`${restaurantData?.name || 'Restaurant'} Logo`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#22c55e] shadow-md border-2 border-white z-20">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>

          <h1 className="text-[36px] font-bold text-gray-900 mb-1 leading-normal">
            {restaurantData?.name}
          </h1>
          <p className="text-[18px] text-gray-500 max-w-md mx-auto">
            {restaurantData?.slogan}
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center rounded-full bg-gray-50 border border-gray-200 px-5 py-2.5 text-[15px] text-gray-500">
              <MapPin className="mr-2 h-4 w-4 text-[#fb923c]" />
              <span>{restaurantData?.address}</span>
            </div>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col items-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fb923c] px-6 py-2.5 text-[16px] font-semibold text-white shadow-md">
              <Smartphone className="h-5 w-5" />
              Scan to Order
            </div>
          </div>

          <div className="relative flex items-center justify-center rounded-2xl bg-white p-6 shadow-inner border border-gray-50">
            <QRCodeSVG
              value={qrCodeDataUrl}
              size={300}
              level="H"
              bgColor="#ffffff"
              fgColor="#1f2937"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border-[4px] border-white bg-white p-1 shadow-md">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={restaurantData?.thumbnail || '/placeholder.svg'}
                  alt={`${restaurantData?.name || 'Restaurant'} Logo`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[15px] text-gray-500">
            <Wifi className="h-5 w-5" />
            <span>Point your camera here to scan</span>
          </div>
        </div>

        <div className="mt-10 flex justify-center w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fb923c] px-8 py-4 text-[18px] font-bold text-white shadow-md whitespace-nowrap">
            🍽️ Scan · Order · Enjoy · Repeat
          </div>
        </div>
      </div>
    </div>
  );
}
