"use client";
import React, { useState } from "react";
import { useGetAllRestaurantIdQuery } from "@/redux/api/restaurant";
import { AnimatePresence, motion } from "motion/react";
import RestaurantCard from "../_components/RestaurantCard";
import RestaurantModal from "../_components/RestaurantModal";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Search } from "lucide-react";
import { Restaurant } from "@/types";

export default function RestaurantsDirectory() {
  const { data, isLoading } = useGetAllRestaurantIdQuery();
  const restaurants = data?.restaurant || [];

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter((r: Restaurant) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rGray font-sans selection:bg-gray-900 selection:text-white">
      <Navbar />

      {/* Hero strip with integrated search */}
      <div className="bg-rYellow border-b-4 border-gray-900 text-gray-900 px-4 pt-36 pb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-3 uppercase tracking-tighter drop-shadow-sm"
            >
              All Restaurants 🍽️
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-900 font-black text-xl uppercase tracking-wider inline-block bg-white px-4 py-1 border-2 border-gray-900 shadow-[3px_3px_0px_#111]"
            >
              {restaurants.length > 0
                ? `${restaurants.length} spot${restaurants.length !== 1 ? "s" : ""} ready for instant ordering`
                : "Discover top spots near you"}
            </motion.p>
          </div>

          {/* Search bar inside Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full md:w-96"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-900" />
            </div>
            <input
              type="text"
              placeholder="Search by restaurant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-4 border-gray-900 rounded-2xl bg-white placeholder-gray-500 text-base font-bold focus:outline-none shadow-[6px_6px_0px_#111] focus:shadow-[3px_3px_0px_#111] transition-all"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Results label */}
        {searchQuery && (
          <p className="text-lg text-gray-900 font-black uppercase tracking-wider mb-8">
            {filteredRestaurants.length} result{filteredRestaurants.length !== 1 ? "s" : ""} for{" "}
            <span className="bg-rYellow px-2 border-2 border-gray-900">&quot;{searchQuery}&quot;</span>
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border-4 border-gray-900 shadow-[6px_6px_0px_#111] animate-pulse">
                <div className="h-48 bg-gray-200 border-b-4 border-gray-900" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-full w-full" />
                  <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredRestaurants.map((restaurant: Restaurant, index: number) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  onClick={setSelectedRestaurant}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_#111] max-w-lg mx-auto"
          >
            <div className="w-24 h-24 mx-auto bg-rYellow rounded-3xl flex items-center justify-center mb-6 border-4 border-gray-900 shadow-[4px_4px_0px_#111]">
              <Search size={40} className="text-gray-900" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
              No restaurants found
            </h3>
            <p className="text-gray-700 font-bold mb-8">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-8 py-4 bg-gray-900 text-rYellow border-2 border-gray-900 rounded-full font-black uppercase tracking-wider shadow-[4px_4px_0px_#C8161D] hover:bg-rRed hover:text-white transition-all"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </main>

      <Footer />

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
