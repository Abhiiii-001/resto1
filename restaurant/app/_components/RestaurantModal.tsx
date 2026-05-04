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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md backdrop-blur-sm transition-colors"
        >
          <X size={18} className="text-gray-700" />
        </button>

        {/* Hero image */}
        <div className="relative h-52 w-full bg-rGray overflow-hidden">
          {restaurant.thumbnail ? (
            <Image
              src={restaurant.thumbnail}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rYellow/30 to-rRed/10 flex items-center justify-center">
              <span className="text-8xl font-black text-rRed/20">
                {restaurant.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Restaurant name overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-2xl font-black text-white leading-tight">
              {restaurant.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Slogan */}
          <p className="text-gray-600 font-medium leading-relaxed mb-6">
            {restaurant.slogan ||
              "Experience great food and seamless ordering — no hassle, no waits."}
          </p>

          {/* Perk tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {perks.map((perk) => (
              <span
                key={perk.label}
                className={`${perk.bg} flex items-center gap-1.5 text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full`}
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
            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold text-base rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-2 group"
          >
            Order Now
            <ArrowUpRight
              size={18}
              className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
