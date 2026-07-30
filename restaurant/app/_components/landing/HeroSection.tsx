"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, ArrowRight, QrCode, Sparkles, ShieldCheck, CheckCircle2, Store, Utensils } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/restaurants');
    }
  };

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-16 overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/15 via-orange-400/10 to-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Platform Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-orange-200/80 shadow-2xs"
            >
              <Sparkles size={14} className="text-primary fill-primary/20" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-800">
                Partner Restaurant Directory & Table QR Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.06]">
              Find Partner Spots. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500">
                Order Directly at Table.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
              Restroo lists registered partner restaurants with live digital menus. Scan the QR code at your dining table to order instantly without waiting or signups.
            </p>

            {/* Restaurant Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl bg-white p-2 rounded-3xl border border-gray-200 shadow-soft-lg flex items-center gap-2">
              <div className="pl-3.5 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search registered partner restaurants..."
                className="flex-1 bg-transparent py-2.5 px-1 text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
              >
                Search <ArrowRight size={15} />
              </button>
            </form>

            {/* 3 Core Platform Steps */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-2xs">
                <p className="text-xs font-bold text-gray-900 mb-0.5">1. Scan Table QR</p>
                <p className="text-[10px] text-gray-500 font-medium">At partner restaurant</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-2xs">
                <p className="text-xs font-bold text-gray-900 mb-0.5">2. Digital Menu</p>
                <p className="text-[10px] text-gray-500 font-medium">Browse & customize</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-2xs">
                <p className="text-xs font-bold text-gray-900 mb-0.5">3. Direct Order</p>
                <p className="text-[10px] text-gray-500 font-medium">Sent to kitchen</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-gray-500 border-t border-gray-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-success" /> 100% Zero Signup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-primary" /> Registered Outlets Only
              </span>
              <a href={clientUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline font-bold">
                <Store size={16} /> Partner Registration →
              </a>
            </div>
          </motion.div>

          {/* Right Column: Platform Features Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-slate-800 space-y-6 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-xs">
                    R
                  </div>
                  <div>
                    <p className="text-xs font-bold">Restroo Directory Hub</p>
                    <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Partner Outlets
                    </p>
                  </div>
                </div>
                <QrCode size={20} className="text-primary" />
              </div>

              <div className="space-y-3">
                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-primary flex items-center justify-center flex-shrink-0">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Live Digital Menus</p>
                    <p className="text-[11px] text-slate-400">Diners view real-time item prices & variant availability.</p>
                  </div>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Instant Table QR Dispatch</p>
                    <p className="text-[11px] text-slate-400">Orders route straight to partner kitchen display screens.</p>
                  </div>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Store size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">For Restaurant Partners</p>
                    <p className="text-[11px] text-slate-400">Register your outlet and start accepting digital orders today.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/restaurants')}
                className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                Browse All Registered Outlets
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
