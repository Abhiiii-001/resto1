import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { QrCode, Zap, ArrowRight, Star } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-12 overflow-hidden bg-rGray selection:bg-gray-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Main Hero Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 md:row-span-2 bg-rYellow rounded-[2rem] p-8 md:p-12 relative overflow-hidden group border-4 border-gray-900 shadow-[8px_8px_0px_#111]"
          >
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500 group-hover:rotate-12 group-hover:scale-110">
               <span className="text-8xl">🍔</span>
            </div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-gray-900 shadow-[4px_4px_0px_#111] mb-8"
            >
              <Zap size={16} className="text-rRed fill-rRed" />
              <span className="text-sm font-black text-gray-900 uppercase tracking-wider">The new standard</span>
            </motion.div>

            <h1 className="text-6xl md:text-[5.5rem] font-black text-gray-900 leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-sm">
              Eat <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">Like It's</span><br/>
              <span className="relative">
                2026.
                <svg className="absolute -bottom-4 left-0 w-full text-rRed" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="6" fill="transparent" />
                </svg>
              </span>
            </h1>

            <button 
              onClick={() => router.push('/restaurants')}
              className="mt-8 flex items-center gap-4 bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-xl uppercase tracking-wider hover:bg-rRed transition-colors shadow-[6px_6px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.2)] hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Explore Now <ArrowRight size={24} />
            </button>
          </motion.div>

          {/* Quick Stats Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 bg-rRed rounded-[2rem] p-8 text-white border-4 border-gray-900 shadow-[8px_8px_0px_#111] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <Star className="fill-rYellow text-rYellow w-12 h-12" />
              <span className="text-5xl font-black tracking-tighter">4.9</span>
            </div>
            <div className="mt-4">
              <p className="text-xl font-black uppercase tracking-tight">Top Rated</p>
              <p className="text-white/80 font-medium">By 10,000+ Foodies</p>
            </div>
          </motion.div>

          {/* QR Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 bg-rGreen rounded-[2rem] p-8 text-gray-900 border-4 border-gray-900 shadow-[8px_8px_0px_#111] relative overflow-hidden group cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111] transition-all"
            onClick={() => router.push('/restaurants')}
          >
            <div className="flex flex-col h-full justify-between relative z-10">
              <QrCode size={48} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mt-4">Scan & Order</h3>
                <p className="text-white/80 font-bold mt-1">Skip the queue.</p>
              </div>
            </div>
            {/* Pattern bg */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent bg-[length:20px_20px]"></div>
          </motion.div>

        </div>

        {/* Marquee Section */}
        <div className="mt-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-gray-900 py-6 border-y-4 border-gray-900 rotate-[-1deg] transform origin-left">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                <span className="text-4xl font-black text-white uppercase tracking-tighter">FAST 🚀</span>
                <span className="text-4xl font-black text-rYellow uppercase tracking-tighter">FRESH 🥗</span>
                <span className="text-4xl font-black text-white uppercase tracking-tighter">LOCAL 🍔</span>
                <span className="text-4xl font-black text-rRed uppercase tracking-tighter">INSTANT ⚡</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
