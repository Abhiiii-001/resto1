import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function Navbar() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 bg-rRed rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transform hover:rotate-12 transition-transform">
              R
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Restro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('hero')} className="text-gray-600 hover:text-rRed font-medium transition-colors">Home</button>
            <button onClick={() => scrollTo('restaurants')} className="text-gray-600 hover:text-rRed font-medium transition-colors">Restaurants</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-gray-600 hover:text-rRed font-medium transition-colors">How it Works</button>
            <button onClick={() => scrollTo('why-choose')} className="text-gray-600 hover:text-rRed font-medium transition-colors">About</button>
          </div>

          <div className="flex items-center">
            <button 
              onClick={() => router.push('/restaurants')}
              className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-md"
            >
              Explore Restaurants
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
