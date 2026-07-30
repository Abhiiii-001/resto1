"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, ArrowLeft, MapPin } from "lucide-react";
import Cart from "./Cart";
import { useAppSelector, useAppDispatch } from "@/redux/redux";
import { syncRestaurantCart } from "@/redux/states/cartSlice";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (restaurantId) {
      dispatch(syncRestaurantCart(restaurantId as string));
    }
  }, [restaurantId, dispatch]);

  const { data: restaurantData } = useGetRestaurantDetailsQuery(restaurantId as string);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);

  const { totalItem } = useAppSelector((state) => state.cart);

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
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 min-w-0"
      >
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0 cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Restaurant Avatar */}
        <div className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200/80">
          <div className="relative w-full h-full">
            <Image
              src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
              alt="logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-sm font-bold text-gray-900 truncate leading-tight tracking-tight">
            {restaurantDetails?.name || "Restroo Direct"}
          </h1>
          <p className="text-[11px] text-gray-400 font-medium truncate flex items-center gap-1">
            <MapPin size={9} className="text-gray-400" />
            {restaurantDetails?.address || "Location..."}
          </p>
        </div>
      </motion.div>

      {/* Right: Cart Button */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex-shrink-0"
        >
          <button
            onClick={handleCartClick}
            className="relative px-4 py-2 rounded-2xl bg-primary text-white font-bold text-xs flex items-center gap-2 hover:bg-primary/95 shadow-sm shadow-primary/20 transition-all cursor-pointer"
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Cart</span>
            {totalItem > 0 && (
              <span className="min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-extrabold rounded-full bg-white text-primary ml-0.5 shadow-xs">
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
