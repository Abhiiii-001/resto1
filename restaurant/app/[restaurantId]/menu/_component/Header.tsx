"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Cart from "./Cart";
import { useAppSelector } from "@/redux/redux";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ isCartOpen, setIsCartOpen }: Props) {
  const { restaurantId } = useParams();
  const router = useRouter();
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsInterface | undefined>();

  const { data: restaurantData } = useGetRestaurantDetailsQuery(restaurantId as string);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);

  const { totalItem } = useAppSelector((state) => state.cart);

  return (
    <div className="flex items-center justify-between h-full">
      {/* Left: Back + Restaurant Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 min-w-0"
      >
        <button
          onClick={() => router.push(`/${restaurantId}`)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="w-9 h-9 rounded-xl border border-gray-100 bg-rGray flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
            alt="logo"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        {/* Restaurant name — visible on all screen sizes */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-sm font-bold text-gray-900 truncate leading-tight">
            {restaurantDetails?.name || "Menu"}
          </h1>
          <p className="text-xs text-gray-400 font-medium truncate hidden sm:block">
            {restaurantDetails?.slogan || "Browse the menu"}
          </p>
        </div>
      </motion.div>

      {/* Right: Cart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 rounded-xl bg-rGray hover:bg-gray-200 transition-colors"
        >
          <ShoppingCart size={22} className="text-gray-700" />
          {totalItem > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold rounded-full bg-rRed text-white">
              {totalItem}
            </span>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {isCartOpen && (
          <Cart setIsCartOpen={setIsCartOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
