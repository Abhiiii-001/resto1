"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllRestaurantIdQuery } from "@/redux/api/restaurant";
import { AnimatePresence } from "motion/react";
import RestaurantCard from "../_components/RestaurantCard";
import RestaurantModal from "../_components/RestaurantModal";
import { ArrowLeft, Search } from "lucide-react";
import { Restaurant } from "@/types";

export default function RestaurantsDirectory() {
  const router = useRouter();
  const { data, isLoading } = useGetAllRestaurantIdQuery({});
  const restaurants = data?.restaurant || [];
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter((r: Restaurant) => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rGray font-sans">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
               <span className="text-xl font-bold text-gray-900 tracking-tight">Restro Directory</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Restaurants</h1>
            <p className="text-gray-600">Find and order from all our registered partners.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rRed focus:border-rRed sm:text-sm transition-shadow"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rRed"></div>
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant: Restaurant) => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant} 
                onClick={setSelectedRestaurant} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
             <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <Search size={32} className="text-gray-400" />
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
             <p className="text-gray-500">We couldn't find any restaurants matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedRestaurant && (
          <RestaurantModal 
            restaurant={selectedRestaurant} 
            onClose={() => setSelectedRestaurant(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
