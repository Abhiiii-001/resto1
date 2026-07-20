import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ChefHat } from 'lucide-react';

const navLinks = [
  {
    'id': 'restaurants',
    'label': 'Restaurants',
    'route': '/restaurants'
  },
  {
    'id': 'about',
    'label': 'About',
    'route': '/about'
  },
  {
    'id': 'contact',
    'label': 'Contact',
    'route': '/contact'
  },
]

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden((prev) => (prev ? prev : true));
    } else {
      setHidden((prev) => (!prev ? prev : false));
    }
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl pointer-events-none">
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full bg-white/30 backdrop-blur-3xl border-2 border-white/40 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto"
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => router.push('/')}
            >
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-rYellow font-black text-2xl shadow-[4px_4px_0px_#C8161D] transition-all group-hover:shadow-[2px_2px_0px_#C8161D] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Restro</span>
            </motion.div>
            
            {/* Links */}
            <div className="hidden md:flex items-center space-x-1.5 bg-white/40 p-1.5 rounded-full border border-white/50">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.route;
                return (
                  <motion.button 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(item.route)} 
                    className={`px-5 py-2.5 font-black text-sm rounded-full transition-all relative ${
                      isActive 
                        ? 'bg-gray-900 text-rYellow border-2 border-gray-900 shadow-[2px_2px_0px_#C8161D]' 
                        : 'text-gray-800 hover:bg-white/80'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/restaurants')}
                className="bg-rRed hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Order Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
