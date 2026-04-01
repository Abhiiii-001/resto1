'use client';

import { useRef, useState } from 'react';
import {
  Eye,
  Share2,
  Download,
  QrCode,
  Smartphone,
  Wifi,
  MapPin,
  Phone,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import { useAppSelector } from '@/redux/redux';
import { useGetRestaurantDetailsQuery } from '@/redux/api/restaurant';
import { skipToken } from '@reduxjs/toolkit/query';
import { RESTAURANT_BASE_URL } from '@/constants/Urls';
import ShareModal from '@/app/_component/ShareLinkModal';
import Loader from '@/components/common/Loader';
import { toast } from 'react-toastify';

export default function QRDisplayPage() {
  const { restaurantId } = useAppSelector((state) => state.auth);
  const { data: restaurantData, isLoading } = useGetRestaurantDetailsQuery(
    restaurantId ?? skipToken,
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!qrRef.current) {
      return;
    }

    setIsDownloading(true);
    const node = qrRef.current;

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 3,
        style: {
          fontFamily: '"Inter", sans-serif',
          background: '#fff',
        },
        // if images are remote, use this as fallback to avoid blank / lines
        imagePlaceholder:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'restaurant-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setIsDownloading(false);
    }
  };

  const getQRCodeDataUrl = () => {
    const restaurantBaseUrl = RESTAURANT_BASE_URL || 'https://example.com';
    return `${restaurantBaseUrl}/${restaurantId}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-[90vh] pb-10">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-32 lg:grid-cols-7">
            {/* QR Code Display - Main Section */}
            <div
              className="lg:col-span-4 m-2"
              ref={qrRef}
              style={{ fontFamily: ' sans-serif' }}
            >
              <div className="relative overflow-hidden rounded-3xl max-w-[600px] border border-sky-200 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
                {/* Background decorative elements */}
                {/* <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-sky-200/30 to-blue-300/30"></div>
                <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-cyan-200/30 to-sky-300/30"></div> */}

                {/* Restaurant Header */}
                <div className="relative z-10 mb-4 text-center">
                  <div className="relative mx-auto mb-3 h-24 w-24">
                    <Image
                      src={restaurantData?.thumbnail || '/placeholder.svg'}
                      alt={`${restaurantData?.name} Logo`}
                      width={160}
                      height={160}
                    />

                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                      <div className="h-3 w-3 rounded-full bg-white"></div>
                    </div>
                  </div>

                  <h1 className="-bold text-3xl text-gray-800 lg:text-4xl">
                    {restaurantData?.name}
                  </h1>

                  <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                    {restaurantData?.slogan}
                  </p>

                  {/* Restaurant Info */}
                  <div className="mt-3 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                    {/* <div className="flex items-center rounded-full bg-sky-50 px-3 py-2">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <span className="">{restaurantData?.rating} Rating</span>
                    </div>
                    <div className="flex items-center rounded-full bg-blue-50 px-3 py-2">
                      <Clock className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="">{restaurantData?.hours}</span>
                    </div> */}
                    <div className="flex items-center rounded-full bg-cyan-50 px-3 py-2">
                      <MapPin className="mr-2 h-4 w-4 text-cyan-500" />
                      <span className="">{restaurantData?.address}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="relative">
                  {/* QR Code Container */}
                  <div className="relative mx-auto max-w-md rounded-3xl border-4 p-6 shadow-xl">
                    {/* Decorative corners */}
                    {/* <div className="absolute left-2 top-2 h-6 w-6 rounded-tl-lg border-l-4 border-t-4 border-sky-500"></div>
                    <div className="absolute right-2 top-2 h-6 w-6 rounded-tr-lg border-r-4 border-t-4 border-sky-500"></div>
                    <div className="absolute bottom-2 left-2 h-6 w-6 rounded-bl-lg border-b-4 border-l-4 border-sky-500"></div>
                    <div className="absolute bottom-2 right-2 h-6 w-6 rounded-br-lg border-b-4 border-r-4 border-sky-500"></div> */}
                    {/* Scan instruction */}
                    <div className="mb-4 text-center">
                      <div className="-bold inline-flex items-center rounded-full bg-blue-400 px-4 py-2 text-sm text-white shadow-lg">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Scan to Order
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="relative rounded-2xl bg-white p-6 shadow-lg flex items-center justify-center">
                      <QRCodeSVG
                        value={getQRCodeDataUrl() || 'https://example.com'}
                        size={240}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#4b5563"
                      />

                      {/* Our website logo overlay */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-sky-200 bg-white p-2 shadow-lg">
                        <Image
                          src={restaurantData?.thumbnail || '/placeholder.svg'}
                          alt={`${restaurantData?.name} Logo`}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 space-y-2 text-center">
                      <div className="flex items-center justify-center text-sky-600">
                        <Wifi className="mr-2 h-4 w-4" />
                        <span>Point your camera here</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Open your camera app and point it at the QR code to view
                        our menu and place orders instantly!
                      </p>
                    </div>
                  </div>

                  {/* taglines */}
                  <div className="mt-8 flex flex-col items-center justify-center gap-6 text-center">
                    {/* <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                      <div className="flex items-center rounded-full bg-green-50 px-3 py-2">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="-medium">Contactless Ordering</span>
                      </div>
                      <div className="flex items-center rounded-full bg-blue-50 px-3 py-2">
                        <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="-medium">Instant Menu Access</span>
                      </div>
                      <div className="flex items-center rounded-full bg-purple-50 px-3 py-2">
                        <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                        <span className="-medium">Secure Payments</span>
                      </div>
                    </div> */}

                    <div className="font-bold inline-block rounded-full bg-blue-400 px-6 py-4 text-white shadow-lg">
                      🍽️ Scan • Order • Enjoy • Repeat 🍽️
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Right Side */}
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold mb-6 text-xl text-gray-800">
                  QR Code Actions
                </h3>

                {/* Live Preview Button */}
                <a
                  href={getQRCodeDataUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex w-full items-center justify-center space-x-3 rounded-2xl bg-blue-400 font-bold p-4 text-lg text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <Eye className="h-6 w-6" />
                  <span>Live Preview</span>
                </a>

                {/* Share QR Button */}
                <button
                  onClick={() => setIsOpenShareModal(true)}
                  className="-bold flex w-full items-center justify-center space-x-3 rounded-2xl bg-blue-400 font-bold text-white p-4 text-lg shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-50"
                >
                  <Share2 className="h-6 w-6" />
                  <span>Share QR Code</span>
                </button>

                {/* Download QR Button */}
                <button
                  disabled={isDownloading}
                  onClick={handleDownload}
                  className=" flex w-full items-center justify-center space-x-3 rounded-2xl border-2 border-blue-400 bg-white/90 text-blue-400 font-bold p-4 text-lg shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-6 w-6" />
                      <span>Download QR</span>
                    </>
                  )}
                </button>

                {/* QR Code Info */}
                <div className="mt-8 rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                  <h4 className="-bold mb-4 flex items-center text-gray-800">
                    <QrCode className="mr-2 h-5 w-5 text-sky-600" />
                    QR Code Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="-medium">PNG (High Quality)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="-medium">1024x1024 px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="-medium">Menu Link</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="-medium flex items-center text-green-600">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage Tips */}
                <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-6">
                  <h4 className="-bold mb-4 text-gray-800">💡 Usage Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sky-500"></div>
                      <span>Place QR codes on every table for easy access</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                      <span>
                        Print in high quality for best scanning results
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500"></div>
                      <span>
                        Display at counter and entrance for visibility
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sky-500"></div>
                      <span>Share on social media to reach more customers</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Support */}
                <div className="rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                  <h4 className="-bold mb-3 flex items-center text-gray-800">
                    <Phone className="mr-2 h-5 w-5 text-sky-600" />
                    Need Help?
                  </h4>
                  <p className="mb-4 text-sm text-gray-600">
                    Our support team is here to help you with QR code setup and
                    customization.
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = `tel:${restaurantData?.number}`)
                    }
                    className="-medium w-full rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 text-white transition-all duration-300 hover:from-gray-700 hover:to-gray-800"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenShareModal && (
        <ShareModal url={getQRCodeDataUrl()} setOpen={setIsOpenShareModal} />
      )}
    </div>
  );
}
