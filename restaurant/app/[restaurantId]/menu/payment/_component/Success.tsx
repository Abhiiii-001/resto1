"use client";
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Download, Home } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import QRCodeStyling from 'qr-code-styling';
import html2canvas from 'html2canvas';
import { RestaurantDetailsInterface } from '@/redux/api/restaurant';
import Link from 'next/link';
import Portal from '@/app/_components/Portal';
import OrderTicketTemplate from './templates/OrderTicketTemplate';

interface SuccessProps {
  data: {
    orderCode: string;
    id: string;
    amount: number;
    name?: string;
    orders: {
      name: string;
      variant: string;
      quantity: number;
      unitPrice: number;
    }[];
  };
  restaurantDetails?: RestaurantDetailsInterface;
}

function Success({ data, restaurantDetails }: SuccessProps) {
  const { width, height } = useWindowSize();
  const qrRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const qrCode = React.useMemo(() => new QRCodeStyling({
    width: 260,
    height: 260,
    dotsOptions: {
      color: "#000000",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 8
    },
  }), []);

  // QR code DOM append effect removed as we use data URL instead

  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');

  useEffect(() => {
    const generateQrDataUrl = async () => {
      try {
        const blob = await qrCode.getRawData('png');
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setQrDataUrl(reader.result as string);
          };
          reader.readAsDataURL(blob as Blob);
        }
      } catch (error) {
        console.error("Error generating QR data URL:", error);
      }
    };

    if (data?.orderCode) {
      qrCode.update({ data: data.orderCode });
      const timer = setTimeout(generateQrDataUrl, 500);
      return () => clearTimeout(timer);
    }
  }, [data, qrCode]);

  const downloadTicketHandler = async () => {
    if (ticketRef.current) {
      ticketRef.current.style.display = 'block';
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const canvas = await html2canvas(ticketRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false
        });

        const link = document.createElement('a');
        link.download = `OrderTicket-${data.orderCode}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Failed to generate ticket:", error);
      } finally {
        ticketRef.current.style.display = 'none';
      }
    }
  };

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="bg-background fixed inset-0 z-50 overflow-x-hidden overflow-y-auto font-sans selection:bg-primary/20 selection:text-primary"
      >
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          initialVelocityY={25}
        />

        <div className="min-h-full w-full flex flex-col items-center justify-center py-10 px-4">
          <AnimatePresence>
            <div className="flex flex-col justify-center items-center gap-5 max-w-md w-full my-auto">
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="shadow-md rounded-full flex items-center justify-center bg-success w-20 h-20 text-white"
              >
                <Check size={40} strokeWidth={3} />
              </motion.div>

              <div className="text-center space-y-1">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order Placed!</h2>
                <p className="text-xs font-semibold text-gray-500">Your order has been sent straight to the kitchen.</p>
              </div>

              {/* QR Code Preview Card */}
              <div className="bg-white p-6 rounded-3xl shadow-soft-lg border border-gray-100 flex flex-col items-center gap-4 w-full text-center">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Order Code</p>
                  <p className="text-3xl font-extrabold text-primary bg-orange-50 px-4 py-1 rounded-2xl inline-block border border-orange-200">
                    {data?.orderCode}
                  </p>
                </div>

                {data?.name && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guest</p>
                    <p className="text-base font-bold text-gray-900">{data.name}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center justify-center min-h-[260px] min-w-[260px]">
                  {qrDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={qrDataUrl} alt="QR Code" className="w-[260px] h-[260px] object-contain" />
                  ) : (
                    <div className="text-gray-300 text-sm font-medium animate-pulse">Generating QR...</div>
                  )}
                </div>

                <p className="text-xs font-medium text-gray-500 px-4">
                  Show this QR code at the counter to collect your order.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  onClick={downloadTicketHandler}
                  className="w-full py-3.5 flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-2xl shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <Download size={16} />
                  Download Ticket PNG
                </button>

                <Link
                  href={`/${restaurantDetails?.id || ''}/menu`}
                  className="w-full py-3.5 flex items-center justify-center gap-2 bg-white text-gray-700 hover:text-gray-900 border border-gray-200 font-bold text-xs rounded-2xl shadow-xs hover:bg-gray-50 transition-all text-center"
                >
                  <Home size={16} />
                  Back to Menu
                </Link>
              </div>

              <p className="text-[11px] text-gray-400 font-medium text-center">
                Please save this order code or ticket image for reference.
              </p>
            </div>
          </AnimatePresence>
        </div>

        {/* HIDDEN TICKET FOR EXPORT */}
        <OrderTicketTemplate
          ticketRef={ticketRef}
          restaurantDetails={restaurantDetails}
          data={data}
          qrDataUrl={qrDataUrl}
        />
      </motion.div>
    </Portal>
  );
}

export default Success;
