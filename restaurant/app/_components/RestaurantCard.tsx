"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Restaurant } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col"
      onClick={() => onClick(restaurant)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full bg-rGray overflow-hidden">
        {restaurant.thumbnail ? (
          <Image
            src={restaurant.thumbnail}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rYellow/20 to-rRed/10">
            <span className="text-6xl font-black text-rRed/30">
              {restaurant.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 truncate leading-tight mb-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
              {restaurant.slogan || "Delicious food waiting for you!"}
            </p>
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-rGray flex items-center justify-center group-hover:bg-rRed transition-colors duration-300 mt-0.5">
            <ArrowUpRight
              size={18}
              className="text-gray-400 group-hover:text-white transition-colors duration-300"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-[11px] font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
            ✓ No login needed
          </span>
          <span className="text-[11px] font-semibold bg-rGray text-gray-500 px-2.5 py-1 rounded-full">
            QR Ready
          </span>
        </div>
      </div>
    </motion.div>
  );
}
