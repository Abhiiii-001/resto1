"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Store, ArrowUpRight, Zap, QrCode, ShieldCheck } from 'lucide-react';

export default function PartnerSection() {
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

  return (
    <section className="py-24 bg-white font-sans overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider"
              >
                <Store size={14} />
                For Restaurant Managers
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white"
              >
                Streamline Your Dining Operations.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-xl"
              >
                Manage digital menus, process table orders instantly, manage variant stocks, and view live order kitchen feeds in real-time.
              </motion.p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold">
                  <Zap size={14} className="text-primary" /> Live Menu Sync
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold">
                  <QrCode size={14} className="text-success" /> Table QR Printing
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold">
                  <ShieldCheck size={14} className="text-blue-400" /> Stock Controls
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white text-gray-900 rounded-3xl p-8 shadow-lg text-center w-full max-w-sm flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-primary flex items-center justify-center text-3xl font-extrabold shadow-sm">
                  🏬
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Partner Dashboard
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    Manage menus, tables, and kitchen feeds.
                  </p>
                </div>

                <a
                  href={clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Partner Dashboard
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
