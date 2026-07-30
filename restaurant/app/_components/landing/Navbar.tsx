"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ChefHat, Utensils, Info, Phone, ArrowRight, Store } from 'lucide-react';

const navLinks = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    route: '/restaurants',
    icon: <Utensils size={14} />,
  },
  {
    id: 'about',
    label: 'About Us',
    route: '/about',
    icon: <Info size={14} />,
  },
  {
    id: 'contact',
    label: 'Contact',
    route: '/contact',
    icon: <Phone size={14} />,
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl pointer-events-none font-sans">
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl shadow-lg overflow-hidden pointer-events-auto transition-all"
      >
        <div className="px-5 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                Restroo<span className="text-primary">.</span>
              </span>
            </motion.div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100/70 p-1 rounded-2xl border border-gray-200/50">
              {navLinks.map((item) => {
                const isActive = pathname === item.route;
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.route)}
                    className={`px-4 py-2 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${isActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/restaurants')}
                className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Explore Outlets
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
