"use client";
import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check, Smartphone } from 'lucide-react';

export default function OrderExperienceSection() {
  const router = useRouter();

  return (
    <section className="py-24 bg-white font-sans overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
            <Smartphone size={14} />
            Seamless UX
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Designed For Instant Action
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Clean layout, clear pricing, variant pickers, and real-time status updates.
          </p>
        </div>

        <div className="relative h-[480px] flex items-center justify-center">
          {/* Main Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-xs h-[440px] bg-white rounded-[2.5rem] border border-gray-200/80 shadow-2xl overflow-hidden"
          >
            <div className="bg-white h-full flex flex-col p-5">
              <div className="flex justify-between items-center mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  R
                </div>
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart size={16} className="text-gray-700" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-4 w-28 bg-gray-900 rounded-full" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-12 h-12 bg-gray-200/80 rounded-xl" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-20 bg-gray-800 rounded-full" />
                        <div className="h-2.5 w-12 bg-gray-400 rounded-full" />
                      </div>
                      <div className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold">
                        +
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => router.push('/restaurants')}
                className="mt-auto h-12 w-full bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center"
              >
                View Cart (3 items)
              </button>
            </div>
          </motion.div>

          {/* Floating snippet 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute left-6 md:left-1/4 z-20 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 w-48 hidden sm:block -rotate-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 text-success rounded-full flex items-center justify-center">
                <Check size={16} />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">Order Sent</p>
                <p className="text-[10px] text-gray-500">Sent to kitchen</p>
              </div>
            </div>
          </motion.div>

          {/* Floating snippet 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute right-6 md:right-1/4 z-20 bg-gray-900 text-white p-5 rounded-2xl shadow-lg border border-gray-800 w-48 hidden sm:block rotate-3"
          >
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Live Ticket</p>
            <p className="text-sm font-extrabold">Table #12</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
