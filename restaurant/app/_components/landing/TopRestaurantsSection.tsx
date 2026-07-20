import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'motion/react';
import RestaurantCard from '../RestaurantCard';
import { Restaurant } from '@/types';
import { ArrowRight } from 'lucide-react';

interface Props {
  restaurants: Restaurant[];
  isLoading: boolean;
  setSelectedRestaurant: (r: Restaurant) => void;
}

export default function TopRestaurantsSection({ restaurants, isLoading, setSelectedRestaurant }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="restaurants" className="py-32 bg-white overflow-hidden border-b-4 border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-2 uppercase tracking-tighter drop-shadow-sm">
              Trending <br className="hidden sm:block"/>
              <span className="text-rRed">Places 🔥</span>
            </h2>
            <p className="text-xl text-gray-900 font-bold border-l-4 border-rYellow pl-4 mt-4 uppercase tracking-wider">
              The most loved spots around you.
            </p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            onClick={() => router.push('/restaurants')}
            className="group flex items-center gap-2 bg-gray-900 text-white font-black px-6 py-3 rounded-full hover:bg-rRed transition-colors uppercase tracking-wider shadow-[4px_4px_0px_#C8161D] hover:shadow-[2px_2px_0px_#C8161D] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            View All <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-rRed border-r-rYellow border-b-rGreen border-l-gray-900"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-8 pb-12 pt-6 px-8 -mx-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {restaurants.slice(0, 6).map((restaurant, index) => (
                <motion.div 
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[320px] w-[320px] md:min-w-[380px] md:w-[380px] flex-shrink-0 snap-center"
                >
                  <RestaurantCard 
                    restaurant={restaurant} 
                    onClick={setSelectedRestaurant} 
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center sm:hidden">
              <button 
                onClick={() => router.push('/restaurants')}
                className="w-full bg-gray-900 text-white font-black py-4 rounded-xl uppercase tracking-widest border-4 border-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                View all restaurants
              </button>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
