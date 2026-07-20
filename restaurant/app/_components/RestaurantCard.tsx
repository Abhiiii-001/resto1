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
      whileHover={{ y: -6, x: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer border-4 border-gray-900 shadow-[6px_6px_0px_#111] hover:shadow-[12px_12px_0px_#111] transition-all duration-300 group h-full flex flex-col"
      onClick={() => onClick(restaurant)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full bg-rGray overflow-hidden border-b-4 border-gray-900">
        {restaurant.thumbnail ? (
          <Image
            src={restaurant.thumbnail}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-rYellow">
            <span className="text-6xl font-black text-gray-900 tracking-tighter mix-blend-overlay opacity-50">
              {restaurant.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-xl font-black text-gray-900 truncate leading-tight mb-1 uppercase tracking-tighter">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-600 font-bold line-clamp-2 leading-relaxed">
              {restaurant.slogan || "Delicious food waiting for you!"}
            </p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-900 bg-rYellow flex items-center justify-center group-hover:bg-rRed transition-colors duration-300 group-hover:rotate-45">
            <ArrowUpRight
              size={20}
              className="text-gray-900 group-hover:text-white transition-colors duration-300"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-rGreen text-white px-3 py-1.5 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_#111]">
            ✓ No login
          </span>
          <span className="text-xs font-black uppercase tracking-wider bg-white text-gray-900 px-3 py-1.5 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_#111]">
            QR Ready
          </span>
        </div>
      </div>
    </motion.div>
  );
}
