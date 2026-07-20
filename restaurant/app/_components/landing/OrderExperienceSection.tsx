import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check, CreditCard } from 'lucide-react';

export default function OrderExperienceSection() {
  const router = useRouter();
  return (
    <section className="py-32 bg-rGray border-b-4 border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tighter"
          >
            Pure <span className="bg-rYellow text-gray-900 px-4 py-1 rotate-1 inline-block border-4 border-gray-900 shadow-[4px_4px_0px_#111]">Magic</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-800 font-bold uppercase tracking-wider mt-4"
          >
            A seamless ordering interface built for pure speed.
          </motion.p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Main Interface Mockup (Menu View) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-xs sm:max-w-sm h-[480px] sm:h-[520px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-[16px_16px_0px_#111] overflow-hidden"
          >
            <div className="bg-white h-full flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 bg-rRed rounded-2xl border-2 border-gray-900 flex items-center justify-center text-white font-black text-xl">R</div>
                <div className="w-10 h-10 bg-rYellow border-2 border-gray-900 rounded-full flex items-center justify-center shadow-[2px_2px_0px_#111]">
                  <ShoppingCart size={20} className="text-gray-900" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-5 w-32 bg-gray-900 rounded-full"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 items-center p-3.5 bg-rGray rounded-2xl border-2 border-gray-900 shadow-[2px_2px_0px_#111]">
                      <div className="w-14 h-14 bg-rYellow border-2 border-gray-900 rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 w-24 bg-gray-900 rounded-full"></div>
                        <div className="h-2.5 w-16 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 bg-rRed border-2 border-gray-900 rounded-lg flex items-center justify-center text-white font-black text-sm">
                        +
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div 
                onClick={() => router.push('/restaurants')}
                className="mt-auto h-14 w-full bg-gray-900 rounded-2xl flex items-center justify-center text-rYellow font-black text-base uppercase tracking-wider border-2 border-gray-900 shadow-[4px_4px_0px_#C8161D] cursor-pointer hover:bg-rRed hover:text-white transition-colors"
              >
                View Cart (3 items)
              </div>
            </div>
          </motion.div>

          {/* Floating UI Elements */}
          
          {/* Cart Preview Snippet */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute left-2 top-1/4 md:left-1/4 z-20 bg-rYellow p-6 rounded-[2rem] shadow-[8px_8px_0px_#111] border-4 border-gray-900 w-48 sm:w-56 hidden sm:block rotate-[-4deg]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-rYellow">
                <ShoppingCart size={20} />
              </div>
              <p className="font-black text-base text-gray-900 uppercase tracking-tight">Cart Ready</p>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-24 bg-gray-900 rounded-full"></div>
              <div className="h-3 w-16 bg-rRed rounded-full"></div>
            </div>
          </motion.div>

          {/* Order Confirmation snippet */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 bottom-1/4 md:right-1/4 z-20 bg-rGreen text-white p-6 rounded-[2rem] shadow-[8px_8px_0px_#111] border-4 border-gray-900 w-52 sm:w-64 transform rotate-6 hidden sm:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-900">
                <Check size={22} />
              </div>
              <p className="font-black text-lg uppercase tracking-tight">Order Placed!</p>
            </div>
            <p className="text-xs text-white font-bold leading-tight uppercase tracking-wider mt-2">Food is in the kitchen. Enjoy!</p>
          </motion.div>

          {/* Payment Card snippet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-4 right-1/2 translate-x-1/2 md:right-1/3 z-20 bg-rRed text-white p-5 rounded-[2rem] shadow-[8px_8px_0px_#111] border-4 border-gray-900 w-48 -rotate-6 hidden sm:block"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8 bg-white text-gray-900 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <CreditCard size={18} />
              </div>
              <span className="font-black text-xs uppercase tracking-widest bg-rYellow text-gray-900 px-2 py-0.5 rounded-full border-2 border-gray-900">Paid</span>
            </div>
            <div className="h-3 w-full bg-white/40 rounded-full mb-2"></div>
            <div className="h-3 w-2/3 bg-white/20 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
