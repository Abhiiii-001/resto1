"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ArrowUpRight, CheckCircle2, Zap, QrCode } from "lucide-react";
import { motion } from "motion/react";
import { Restaurant } from "@/types";

interface RestaurantModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const perks = [
  {
    icon: <CheckCircle2 size={16} className="text-rGreen" />,
    label: "No login required",
    bg: "bg-green-50",
  },
  {
    icon: <Zap size={16} className="text-rYellow" />,
    label: "Order in seconds",
    bg: "bg-yellow-50",
  },
  {
    icon: <QrCode size={16} className="text-blue-500" />,
    label: "QR scan supported",
    bg: "bg-blue-50",
  },
];

export default function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  const router = useRouter();

  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto py-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative bg-white w-full sm:max-w-md rounded-[2.5rem] border-4 border-gray-900 shadow-[12px_12px_0px_#111] overflow-hidden z-10 font-sans my-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-rYellow border-2 border-gray-900 rounded-full shadow-[2px_2px_0px_#111] hover:bg-rRed hover:text-white transition-all"
        >
          <X size={20} className="text-gray-900" />
        </button>

        {/* Hero image */}
        <div className="relative h-56 w-full bg-rYellow overflow-hidden border-b-4 border-gray-900">
          {restaurant.thumbnail ? (
            <Image
              src={restaurant.thumbnail}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-rYellow flex items-center justify-center">
              <span className="text-8xl font-black text-gray-900">
                {restaurant.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

          {/* Restaurant name overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter drop-shadow-md">
              {restaurant.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Slogan */}
          <p className="text-gray-800 font-bold leading-relaxed mb-6 text-base">
            {restaurant.slogan ||
              "Experience great food and seamless ordering — no hassle, no waits."}
          </p>

          {/* Perk tags */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {perks.map((perk) => (
              <span
                key={perk.label}
                className="bg-rGray border-2 border-gray-900 shadow-[2px_2px_0px_#111] flex items-center gap-1.5 text-xs font-black uppercase text-gray-900 px-3.5 py-1.5 rounded-full"
              >
                {perk.icon}
                {perk.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/${restaurant.id}`)}
            className="w-full py-4 bg-gray-900 hover:bg-rRed text-rYellow hover:text-white font-black text-lg uppercase tracking-wider rounded-2xl border-4 border-gray-900 shadow-[6px_6px_0px_#C8161D] transition-all flex items-center justify-center gap-2 group"
          >
            Order Now
            <ArrowUpRight
              size={20}
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
