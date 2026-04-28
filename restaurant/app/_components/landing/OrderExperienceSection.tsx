import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Check, CreditCard } from 'lucide-react';

export default function OrderExperienceSection() {
  return (
    <section className="py-24 bg-rGray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 mb-4"
          >
            Experience the Magic
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-medium"
          >
            A seamless ordering interface built for speed and delight.
          </motion.p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Main Interface Mockup (Menu View) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-xs sm:max-w-sm h-[450px] sm:h-[500px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden"
          >
            <div className="bg-white h-full flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rRed rounded-xl"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart size={18} className="text-gray-600" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded-full"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 items-center p-3 bg-rGray rounded-2xl">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-16 sm:w-24 bg-gray-300 rounded-full"></div>
                        <div className="h-1.5 w-10 sm:w-16 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rRed rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        +
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto h-12 sm:h-14 w-full bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
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
            className="absolute left-2 top-1/4 md:left-1/4 z-20 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 w-40 sm:w-48 hidden sm:block"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-rYellow rounded-lg flex items-center justify-center text-white">
                <ShoppingCart size={16} />
              </div>
              <p className="font-bold text-sm text-gray-800">Cart Preview</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="h-3 w-16 bg-gray-800 rounded-full"></div>
                <div className="h-3 w-12 bg-rRed rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Order Confirmation snippet */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 bottom-1/4 md:right-1/4 z-20 bg-rGreen text-white p-5 rounded-3xl shadow-xl w-48 sm:w-56 transform rotate-3 hidden sm:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Check size={18} />
              </div>
              <p className="font-bold">Order Placed!</p>
            </div>
            <p className="text-xs text-white/80 font-medium leading-tight">Your food is being prepared. Enjoy!</p>
          </motion.div>

          {/* Payment Card snippet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-4 right-1/2 translate-x-1/2 md:right-1/3 z-20 bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 w-44 -rotate-6 hidden sm:block"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="w-6 h-6 bg-rRed/10 rounded flex items-center justify-center">
                <CreditCard size={14} className="text-rRed" />
              </div>
              <div className="h-1 w-8 bg-gray-100 rounded-full"></div>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
            <div className="h-2 w-2/3 bg-gray-50 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
