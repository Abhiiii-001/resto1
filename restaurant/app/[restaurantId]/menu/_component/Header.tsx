"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Cart from "./Cart";
import { useAppSelector } from "@/redux/redux";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  isCartOpen?: boolean;
  setIsCartOpen?: Dispatch<SetStateAction<boolean>>;
  backUrl?: string;
  showCart?: boolean;
};

function Header({ isCartOpen = false, setIsCartOpen, backUrl, showCart = true }: Props) {
  const { restaurantId } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [internalCartOpen, setInternalCartOpen] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsInterface | undefined>();

  const { data: restaurantData } = useGetRestaurantDetailsQuery(restaurantId as string);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);

  const { totalItem } = useAppSelector((state) => state.cart);

  // Determine back navigation dynamically if not passed
  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else if (pathname?.endsWith("/payment")) {
      router.push(`/${restaurantId}/menu`);
    } else if (pathname?.endsWith("/menu")) {
      router.push(`/${restaurantId}`);
    } else {
      router.push("/restaurants");
    }
  };

  const handleCartClick = () => {
    if (setIsCartOpen) {
      setIsCartOpen(true);
    } else {
      setInternalCartOpen(true);
    }
  };

  const activeCartOpen = setIsCartOpen ? isCartOpen : internalCartOpen;
  const activeSetCartOpen = setIsCartOpen || setInternalCartOpen;

  return (
    <div className="flex items-center w-full justify-between h-full bg-white font-sans">
      {/* Left: Back + Restaurant Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 min-w-0"
      >
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="w-10 h-10 rounded-full border-2 border-gray-900 bg-rYellow flex items-center justify-center text-gray-900 hover:bg-rRed hover:text-white transition-all shadow-[2px_2px_0px_#111] flex-shrink-0"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Restaurant Logo */}
        <div className="w-10 h-10 rounded-xl border-2 border-gray-900 bg-rYellow flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[2px_2px_0px_#111]">
          <Image
            src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Restaurant Name & Status */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-gray-900 truncate leading-tight uppercase tracking-tighter">
              {restaurantDetails?.name || "Restro Direct"}
            </h1>
            {restaurantDetails?.isOpen && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rGreen text-white border border-gray-900 text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Open
              </span>
            )}
          </div>
          <p className="text-xs text-gray-700 font-bold truncate hidden sm:block">
            {restaurantDetails?.slogan || "Smart Digital Menu & Ordering"}
          </p>
        </div>
      </motion.div>

      {/* Right: Cart Button */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex-shrink-0"
        >
          <button
            onClick={handleCartClick}
            className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-gray-900 bg-rYellow font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_#111] hover:bg-rRed hover:text-white transition-all text-gray-900"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {totalItem > 0 && (
              <span className="min-w-6 h-6 px-1 flex items-center justify-center text-xs font-black rounded-full bg-rRed text-white border-2 border-gray-900 shadow-[2px_2px_0px_#111]">
                {totalItem}
              </span>
            )}
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {activeCartOpen && (
          <Cart setIsCartOpen={activeSetCartOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
