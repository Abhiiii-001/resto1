import React from 'react';
import { RestaurantDetailsInterface } from '@/redux/api/restaurant';

interface OrderTicketTemplateProps {
  ticketRef: React.RefObject<HTMLDivElement | null>;
  restaurantDetails?: RestaurantDetailsInterface;
  data: {
    orderCode: string;
    amount: number;
    name?: string;
    orders: {
      name: string;
      variant?: string;
      quantity: number;
      unitPrice: number;
    }[];
  };
  qrDataUrl: string;
}

export default function OrderTicketTemplate({
  ticketRef,
  restaurantDetails,
  data,
  qrDataUrl,
}: OrderTicketTemplateProps) {
  return (
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
      <div className="p-8 border border-gray-100">
        <div className="text-center mb-6">
          {restaurantDetails?.thumbnail && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={restaurantDetails.thumbnail}
              alt="Logo"
              className="w-16 h-16 object-cover rounded-2xl mx-auto mb-2"
            />
          )}
          <h1 className="text-xl font-bold text-gray-900">{restaurantDetails?.name || 'Restaurant Order'}</h1>
          <p className="text-xs text-gray-500 font-medium">{restaurantDetails?.slogan}</p>
        </div>

        <div className="border-t border-dashed border-gray-200 my-4" />

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Order Code</p>
            <p className="text-2xl font-extrabold text-primary">{data?.orderCode}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
            <p className="text-xs font-bold text-gray-700">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        {data?.name && (
          <div className="mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Guest</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{data.name}</p>
          </div>
        )}

        <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Order Items</p>
          <div className="space-y-1.5">
            {data?.orders?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">{item.name}{item.variant ? ` (${item.variant})` : ''} <span className="text-gray-400">×{item.quantity}</span></span>
                <span className="font-bold text-gray-900">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-2 flex justify-between text-sm font-bold">
            <span className="text-gray-900">Total Amount</span>
            <span className="text-primary">₹{data?.amount}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 bg-white border border-gray-100 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">SCAN TO VERIFY</p>
          {qrDataUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={qrDataUrl} alt="QR Code" className="w-40 h-40" />
          ) : (
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-300">Loading QR...</div>
          )}
        </div>
      </div>
    </div>
  );
}
