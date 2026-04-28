import Image from "next/image";

import { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onClick={() => onClick(restaurant)}
    >
      <div className="h-48 w-full bg-richYellow-100 flex items-center justify-center relative">
        {restaurant.thumbnail ? (
          <Image 
            src={restaurant.thumbnail} 
            alt={restaurant.name} 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="w-24 h-24 bg-richYellow-400 rounded-full flex items-center justify-center text-4xl font-bold text-white">
            {restaurant.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{restaurant.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {restaurant.slogan || "Delicious food waiting for you!"}
        </p>
        <div className="mt-4 flex items-center justify-between">
           <span className="text-xs bg-rGray px-2 py-1 rounded text-gray-600">Scan & Order</span>
           <span className="text-rRed font-semibold text-sm">View Details &rarr;</span>
        </div>
      </div>
    </div>
  );
}
