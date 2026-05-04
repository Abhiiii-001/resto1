"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllRestaurantIdQuery } from "@/redux/api/restaurant";
import { AnimatePresence, motion } from "motion/react";
import RestaurantCard from "../_components/RestaurantCard";
import RestaurantModal from "../_components/RestaurantModal";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { Restaurant } from "@/types";

export default function RestaurantsDirectory() {
  const router = useRouter();
  const { data, isLoading } = useGetAllRestaurantIdQuery();
  const restaurants = data?.restaurant || [];

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter((r: Restaurant) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rGray font-sans">
      {/* Sticky Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="w-8 h-8 bg-rRed rounded-lg flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-lg font-bold text-gray-900">Restro</span>
            </div>
          </div>

          {/* Search bar — desktop */}
          <div className="relative hidden sm:block w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl bg-rGray placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rRed/20 focus:border-rRed transition-all"
            />
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-rRed text-white px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black mb-2"
          >
            All Restaurants 🍽️
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-red-100 font-medium"
          >
            {restaurants.length > 0
              ? `${restaurants.length} restaurant${restaurants.length !== 1 ? "s" : ""} available to order from`
              : "Discover restaurants near you"}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile search */}
        <div className="relative sm:hidden mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-3 border border-gray-200 rounded-2xl bg-white placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rRed/20 focus:border-rRed transition-all shadow-sm"
          />
        </div>

        {/* Results label */}
        {searchQuery && (
          <p className="text-sm text-gray-500 font-medium mb-6">
            {filteredRestaurants.length} result{filteredRestaurants.length !== 1 ? "s" : ""} for{" "}
            <span className="text-gray-900 font-bold">"{searchQuery}"</span>
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-full" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredRestaurants.map((restaurant: Restaurant, index: number) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
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
            className="text-center py-32"
          >
            <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-500 font-medium mb-8">
              We couldn't find anything matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Clear search
            </button>
          </motion.div>
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
