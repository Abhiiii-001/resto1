"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Store, ArrowUpRight, Zap, QrCode, ShieldCheck } from 'lucide-react';

export default function PartnerSection() {
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

  return (
    <section className="py-24 bg-rYellow border-b-4 border-gray-900 overflow-hidden relative selection:bg-gray-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gray-900 rounded-[2.5rem] border-4 border-gray-900 shadow-[12px_12px_0px_#111] p-8 md:p-16 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
            🏬
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rRed text-white border-2 border-gray-900 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#fff]"
              >
                <Store size={16} />
                For Restaurant Owners & Outlets
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1.05]"
              >
                Supercharge Your <br />
                <span className="text-rYellow">Outlet Today.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-300 font-bold max-w-xl leading-relaxed"
              >
                Take full control of your restaurant. Update digital menus on the fly, process counter payments instantly, and receive live kitchen tickets in real-time.
              </motion.p>

              {/* Feature Pill Tags */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 bg-gray-800 border-2 border-gray-700 px-4 py-2 rounded-xl text-xs font-black text-white uppercase">
                  <Zap size={16} className="text-rYellow" /> Instant Sync
                </div>
                <div className="flex items-center gap-2 bg-gray-800 border-2 border-gray-700 px-4 py-2 rounded-xl text-xs font-black text-white uppercase">
                  <QrCode size={16} className="text-rGreen" /> QR Generator
                </div>
                <div className="flex items-center gap-2 bg-gray-800 border-2 border-gray-700 px-4 py-2 rounded-xl text-xs font-black text-white uppercase">
                  <ShieldCheck size={16} className="text-rRed" /> Secure Orders
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] border-4 border-gray-900 p-8 shadow-[8px_8px_0px_#C8161D] text-center w-full max-w-sm flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-rYellow border-4 border-gray-900 flex items-center justify-center text-4xl shadow-[4px_4px_0px_#111]">
                  🚀
                </div>

                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                    Partner Dashboard
                  </h3>
                  <p className="text-xs text-gray-700 font-bold mt-1">
                    Sign in to manage your outlet, menus, and staff.
                  </p>
                </div>

                <a
                  href={clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-rRed hover:bg-red-700 text-white font-black text-base uppercase tracking-wider rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
                >
                  Partner Dashboard
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
