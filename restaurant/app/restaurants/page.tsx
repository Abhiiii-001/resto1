"use client";
import React, { useState, useEffect } from "react";
import { useGetAllRestaurantIdQuery } from "@/redux/api/restaurant";
import { AnimatePresence, motion } from "motion/react";
import RestaurantCard from "../_components/RestaurantCard";
import RestaurantModal from "../_components/RestaurantModal";
import Navbar from "../_components/landing/Navbar";
import Footer from "../_components/landing/Footer";
import { Search, Store, X } from "lucide-react";
import { Restaurant } from "@/types";
import { useSearchParams } from "next/navigation";

export default function RestaurantsDirectory() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const { data, isLoading } = useGetAllRestaurantIdQuery();
  const restaurants = data?.restaurant || [];

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialQuery]);

  const filteredRestaurants = restaurants.filter((r: Restaurant) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.slogan && r.slogan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-orange-50/80 via-white to-background pt-32 pb-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
                <Store size={14} />
                Partner Outlets Directory
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
                All Partner Restaurants
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {restaurants.length > 0
                  ? `Browse ${restaurants.length} registered partner outlet${restaurants.length !== 1 ? "s" : ""} ready for instant table QR ordering`
                  : "Explore partner restaurants registered with Restroo"}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by restaurant name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchQuery && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Showing {filteredRestaurants.length} result{filteredRestaurants.length !== 1 ? "s" : ""} for &quot;<span className="text-gray-900">{searchQuery}</span>&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 p-4 space-y-4 animate-pulse">
                <div className="h-44 bg-gray-100 rounded-2xl" />
                <div className="h-5 bg-gray-100 rounded-full w-3/4" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2" />
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
                transition={{ duration: 0.3, delay: index * 0.04 }}
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
            className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-soft max-w-md mx-auto p-8"
          >
            <div className="w-16 h-16 mx-auto bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              No partner restaurants found
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">
              We couldn&apos;t find any registered outlet matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-primary text-white text-xs font-bold rounded-2xl shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer"
            >
              Show all partner restaurants
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
