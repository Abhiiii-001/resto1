import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { Restaurant } from "@/types";

interface RestaurantModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export default function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  const router = useRouter();

  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="h-64 w-full bg-richYellow-100 relative">
          {restaurant.thumbnail ? (
            <Image 
              src={restaurant.thumbnail} 
              alt={restaurant.name} 
              fill 
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-richYellow-400 flex items-center justify-center text-6xl font-bold text-white">
              {restaurant.name.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h2 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h2>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {restaurant.slogan || "Experience delicious food and excellent service. Order directly from your table with zero hassle."}
          </p>
          
          <div className="space-y-4">
            <div className="bg-rGray p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rGreen/20 flex items-center justify-center text-rGreen font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-800">No App Required</p>
                <p className="text-sm text-gray-500">Order directly to the kitchen</p>
              </div>
            </div>
            
            <button 
              onClick={() => router.push(`/${restaurant.id}`)}
              className="w-full py-4 bg-rRed hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-colors shadow-md hover:shadow-lg transform active:scale-95"
            >
              Order Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
