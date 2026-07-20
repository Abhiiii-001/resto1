import React from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Twitter, Facebook, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-rGray border-t-4 border-gray-900 pt-24 pb-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => scrollTo('hero')}>
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-rYellow font-black text-2xl shadow-[4px_4px_0px_#C8161D] group-hover:shadow-[2px_2px_0px_#C8161D] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Restro</span>
            </div>
            <p className="text-gray-900 font-bold mb-8 text-xl leading-snug">
              The modern way to experience dining. <br/>
              <span className="bg-rYellow px-2">Skip the wait.</span>
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border-4 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-rRed hover:text-white shadow-[4px_4px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 text-gray-700 font-bold">
              <li><button onClick={() => router.push('/restaurants')} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">Restaurants</button></li>
              <li><button onClick={() => { router.push('/'); setTimeout(() => scrollTo('how-it-works'), 100); }} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">How it Works</button></li>
              <li><button onClick={() => { router.push('/'); setTimeout(() => scrollTo('why-choose'), 100); }} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">Features</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-700 font-bold">
              <li><button onClick={() => router.push('/about')} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">About Us</button></li>
              <li><button onClick={() => router.push('/contact')} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">Careers</button></li>
              <li><button onClick={() => router.push('/contact')} className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4">Contact</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-wider">For Partners</h4>
            <ul className="space-y-4 text-gray-700 font-bold">
              <li>
                <a 
                  href={process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4 flex items-center gap-1"
                >
                  Partner Dashboard
                </a>
              </li>
              <li>
                <a 
                  href={process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-rRed transition-colors hover:underline decoration-4 underline-offset-4"
                >
                  Partner Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Background Logo Text */}
        <div className="w-full border-t-4 border-gray-900 pt-8 pb-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[15vw] leading-none font-black text-gray-900 uppercase tracking-tighter text-center whitespace-nowrap"
          >
            RESTRO
          </motion.h1>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t-4 border-gray-900 mt-8">
          <p className="text-gray-900 text-sm font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Restro. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-900 font-bold uppercase tracking-wider">
            <button onClick={() => router.push('/privacy')} className="hover:text-rRed hover:underline decoration-2 underline-offset-4">Privacy</button>
            <button onClick={() => router.push('/terms')} className="hover:text-rRed hover:underline decoration-2 underline-offset-4">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
