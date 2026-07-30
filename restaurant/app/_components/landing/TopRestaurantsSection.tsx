"use client";
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'motion/react';
import RestaurantCard from '../RestaurantCard';
import { Restaurant } from '@/types';
import { ArrowRight, Flame } from 'lucide-react';

interface Props {
  restaurants: Restaurant[];
  isLoading: boolean;
  setSelectedRestaurant: (r: Restaurant) => void;
}

export default function TopRestaurantsSection({ restaurants, isLoading, setSelectedRestaurant }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="restaurants" className="relative py-32 bg-[#fafafa] font-sans overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <Flame size={14} className="fill-primary" />
              Popular Destinations
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Trending <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Restaurants
              </span>
            </h2>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => router.push('/restaurants')}
            className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Explore all {restaurants.length > 0 ? `(${restaurants.length})` : ""}
            <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 p-4 space-y-4 animate-pulse shadow-sm">
                <div className="h-52 bg-gray-100 rounded-3xl" />
                <div className="h-5 bg-gray-100 rounded-full w-3/4 mx-2" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2 mx-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <motion.div 
                key={restaurant.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <RestaurantCard 
                  restaurant={restaurant} 
                  onClick={setSelectedRestaurant} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
