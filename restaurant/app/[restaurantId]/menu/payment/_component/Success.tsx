"use client"
import React, { useEffect, useRef } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { Check, Download, Home, ReceiptText } from 'lucide-react'
import ReactConfetti from 'react-confetti'
import {useWindowSize} from 'react-use';
import QRCodeStyling from 'qr-code-styling'
import html2canvas from 'html2canvas'
import { RestaurantDetailsInterface } from '@/redux/api/restaurant'
import Link from 'next/link'

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

    const {width,height} = useWindowSize();
    const qrRef = useRef<HTMLDivElement>(null);
    const ticketRef = useRef<HTMLDivElement>(null);
    
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        dotsOptions: {
          color: "#000000",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10
        },
    });

    useEffect(() => {
        if (qrRef.current) {
          qrCode.append(qrRef.current);
        }
    }, [])

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
            // Small delay to ensure QR is updated before capturing
            const timer = setTimeout(generateQrDataUrl, 500);
            return () => clearTimeout(timer);
        }
    }, [data])

    const downloadTicketHandler = async () => {
        if (ticketRef.current) {
            // Temporarily show the ticket for capturing
            ticketRef.current.style.display = 'block';
            
            try {
                // Ensure the ticket is rendered before capturing
                await new Promise(resolve => setTimeout(resolve, 100));

                const canvas = await html2canvas(ticketRef.current, {
                    scale: 3, // High quality
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
    }

  return (
    <motion.div
    initial={{opacity: 0, scale:0.8}}
    animate={{opacity:1, scale:1}}
    transition={{ease:"easeInOut", duration:0.4}}
    className='bg-rGray absolute inset-0 flex items-center justify-center w-screen min-h-screen px-4 z-50'
    >
        <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={800}
        initialVelocityY={30}
        />
        
        <AnimatePresence>
            <div className='flex flex-col justify-center items-center gap-6 max-w-md w-full mt-6 mb-6 '>
                {/* success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='shadow-2xl text-4xl rounded-full flex items-center justify-center bg-rGreen w-24 h-24 text-white'
                >
                    <Check size={48} strokeWidth={3} />
                </motion.div>

                <div className='text-center space-y-2'>
                    <h2 className='text-4xl font-serif font-bold text-gray-900'>Success!</h2>
                    <p className='text-lg font-medium text-gray-600'>Your order has been placed.</p>
                </div>

                {/* QR Code Preview Card */}
                <div className='bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 w-full'>
                    <div className='text-center'>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Order Code</p>
                        <p className='text-2xl font-black text-gray-900'>{data?.orderCode}</p>
                    </div>

                    {data?.name && (
                        <div className='text-center'>
                            <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Customer</p>
                            <p className='text-lg font-bold text-gray-700 capitalize'>{data.name}</p>
                        </div>
                    )}
                    
                    <div className='bg-gray-50 p-4 rounded-2xl' ref={qrRef} />
                    
                    <p className='text-sm font-semibold text-gray-500 text-center px-4'>
                        Show this QR code at the counter to collect your order.
                    </p>
                </div>
                
                <div className='flex flex-col gap-3 w-full'>
                    <button
                        onClick={downloadTicketHandler}
                        className='flex-1 py-4 flex items-center justify-center gap-2 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all active:scale-95'
                    >
                        <Download size={20} />
                        Download Ticket
                    </button>
                    
                    <Link
                        href={`/${restaurantDetails?.id}/menu`}
                        className='flex-1 py-4 flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-2xl shadow-sm hover:bg-gray-50 transition-all active:scale-95'
                    >
                        <Home size={20} />
                        Go to Home
                    </Link>
                </div>

                <p className='text-sm text-gray-400 font-medium'>
                    Please save this ticket for your reference.
                </p>
            </div>
        </AnimatePresence>

        {/* HIDDEN TICKET FOR EXPORT */}
        <div 
            ref={ticketRef}
            style={{ 
                display: 'none', 
                position: 'absolute', 
                left: '-9999px',
                width: '400px',
                backgroundColor: 'white',
                fontFamily: 'sans-serif'
            }}
        >
            <div className="p-8 border-4 border-gray-100">
                {/* Header */}
                <div className="text-center mb-6">
                    {restaurantDetails?.thumbnail && (
                        <img 
                            src={restaurantDetails.thumbnail} 
                            alt="Logo" 
                            className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                        />
                    )}
                    <h1 className="text-2xl font-black text-gray-900">{restaurantDetails?.name || 'Restaurant Order'}</h1>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{restaurantDetails?.slogan}</p>
                </div>

                <div className="border-t-2 border-dashed border-gray-200 my-4"></div>

                {/* Order Details */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order Code</p>
                        <p className="text-2xl font-black text-gray-900">{data?.orderCode}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                        <p className="text-sm font-bold text-gray-700">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>

                {data?.name && (
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guest</p>
                        <p className="text-lg font-bold text-gray-900 capitalize">{data.name}</p>
                    </div>
                )}

                {/* Items */}
                <div className="mb-6 bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Order Summary</p>
                    <div className="space-y-2">
                        {data?.orders?.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="font-bold text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                                <span className="font-black text-gray-900">₹{item.unitPrice * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                        <span className="text-sm font-bold text-gray-900">Total Amount</span>
                        <span className="text-lg font-black text-rRed">₹{data?.amount}</span>
                    </div>
                </div>

                {/* QR Section */}
                <div className="flex flex-col items-center gap-2 bg-white border-2 border-gray-100 p-4 rounded-3xl">
                    <p className="text-[10px] font-bold text-gray-400 mb-1 tracking-widest">SCAN TO VERIFY</p>
                    {qrDataUrl ? (
                        <img src={qrDataUrl} alt="QR Code" className="w-48 h-48" />
                    ) : (
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-300">Loading QR...</div>
                    )}
                    <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest mt-2">
                        Thank you for your visit!
                    </p>
                </div>
                
                {/* Footer Deco */}
                <div className="mt-8 flex justify-center gap-1">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-100 rounded-full"></div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Success
