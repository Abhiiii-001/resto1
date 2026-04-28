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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="restaurants" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-2">Trending Places 🔥</h2>
            <p className="text-lg text-gray-600">The most loved spots around you.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            onClick={() => router.push('/restaurants')}
            className="group flex items-center gap-2 text-gray-900 font-bold hover:text-rRed transition-colors hidden sm:flex"
          >
            View All <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rRed"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {restaurants.slice(0, 6).map((restaurant, index) => (
                <motion.div 
                  key={restaurant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] flex-shrink-0 snap-center"
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
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-colors"
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
