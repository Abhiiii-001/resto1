import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { QrCode, Utensils } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-rGray pt-10">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rYellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-rRed rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-rGreen rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-rGreen"></span>
          <span className="text-sm font-medium text-gray-800">The new way to dine in</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-tight mb-6"
        >
          Order Food <br/>
          <span className="text-rRed relative whitespace-nowrap">
            Instantly 🍔
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-rYellow/50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium"
        >
          Browse local restaurants or scan a QR code at your table to order seamlessly without an app.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => router.push('/restaurants')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <Utensils size={20} />
            Explore Restaurants
          </button>
          
          <button 
            onClick={() => alert('Scan QR feature coming soon!')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-sm"
          >
            <QrCode size={20} />
            Scan QR
          </button>
        </motion.div>
      </div>
    </section>
  );
}
