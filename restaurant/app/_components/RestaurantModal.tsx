"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ArrowUpRight, CheckCircle2, Zap, QrCode, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Restaurant } from "@/types";
import Portal from "./Portal";

interface RestaurantModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const perks = [
  {
    icon: <CheckCircle2 size={14} className="text-success" />,
    label: "No login required",
  },
  {
    icon: <Zap size={14} className="text-primary" />,
    label: "Order in seconds",
  },
  {
    icon: <QrCode size={14} className="text-blue-500" />,
    label: "QR scan supported",
  },
];

export default function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  const router = useRouter();

  // Scroll lock and Escape listener
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!restaurant) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 font-sans bg-black/60 backdrop-blur-xs">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="restaurant-modal-title"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative bg-white w-full sm:max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/40 transition-all cursor-pointer group"
          >
            <X size={20} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Hero image */}
          <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
            {restaurant.thumbnail ? (
              <Image
                src={restaurant.thumbnail}
                alt={restaurant.name}
                fill
                className="object-cover scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center">
                <span className="text-8xl font-black text-primary opacity-40">
                  {restaurant.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Restaurant name overlaid */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-6">
              <h2 id="restaurant-modal-title" className="text-3xl font-black text-white mb-2 leading-tight">
                {restaurant.name}
              </h2>
              {restaurant.address && (
                <p className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                  <span className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <MapPin size={12} className="text-white" />
                  </span>
                  {restaurant.address}
                </p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <p className="text-gray-600 text-base leading-relaxed font-medium mb-8">
              {restaurant.slogan || "Experience seamless dining with our digital menu. No signup required—just browse, order, and enjoy."}
            </p>

            <div className="space-y-4 mb-10">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Why Order Here?</h4>
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    {perk.icon}
                  </div>
                  <span className="text-gray-700 font-bold text-sm">{perk.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push(`/${restaurant.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:to-orange-400 text-white font-black text-base py-4 rounded-2xl shadow-xl shadow-primary/25 transition-all cursor-pointer group"
              >
                Open Digital Menu
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}
