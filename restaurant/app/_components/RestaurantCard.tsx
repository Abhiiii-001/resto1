"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Restaurant } from "@/types";
import { ArrowUpRight, MapPin, ShieldCheck, Zap } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const r = restaurant as Restaurant & { isOpen?: boolean; address?: string };
  const isOpen = r.isOpen ?? true;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group h-full flex flex-col font-sans relative"
      onClick={() => onClick(restaurant)}
    >
      {/* Cover Image Header */}
      <div className="relative h-56 w-full bg-gray-50 overflow-hidden">
        {r.thumbnail ? (
          <Image
            src={r.thumbnail}
            alt={r.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-50">
            <span className="text-6xl font-black text-primary opacity-40 group-hover:scale-110 transition-transform duration-700">
              {r.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Open/Closed Badge */}
        <div className="absolute top-4 left-4 z-10">
          {isOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/90 text-emerald-600 backdrop-blur-md shadow-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/90 text-red-500 backdrop-blur-md shadow-sm border border-white/20">
              Closed
            </span>
          )}
        </div>

        {/* Action Button Indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-sm text-gray-700 group-hover:bg-primary group-hover:text-white transition-colors duration-300 transform group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 flex flex-col flex-1 bg-white justify-between relative z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-900 truncate leading-tight mb-2 group-hover:text-primary transition-colors">
            {r.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed mb-4">
            {r.slogan || "Registered partner restaurant. Tap to view digital menu and place table order."}
          </p>

          {r.address && (
            <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 truncate mb-4 bg-gray-50/50 p-2 rounded-lg">
              <MapPin size={14} className="text-primary/60 flex-shrink-0" />
              {r.address}
            </p>
          )}
        </div>

        {/* Footer Feature Badges */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50/50 px-2.5 py-1.5 rounded-full border border-emerald-100/50">
              <ShieldCheck size={12} /> No Signup
            </span>
            <span className="inline-flex items-center gap-1 text-primary bg-orange-50/50 px-2.5 py-1.5 rounded-full border border-orange-100/50">
              <Zap size={12} /> Table QR
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
