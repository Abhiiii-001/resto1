"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import Cart from "./Cart";
import { useAppSelector } from "@/redux/redux";
import { useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import { useParams } from "next/navigation";
import Image from "next/image";

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ isCartOpen, setIsCartOpen }: Props) {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState();

  const { data: restaurantData, isLoading: restaurantDetailsLoader } =
    useGetRestaurantDetailsQuery(restaurantId);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);
  //console.log("Restaurant Details", restaurantDetails);

  const { totalItem } = useAppSelector((state) => state.cart);

  return (
    <div className="flex items-center justify-between ">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className=""
      >
        <div className="flex items-center gap-2 ">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            {/* logo */}
            <Image
                src={
                  restaurantDetails?.thumbnail ||
                  process.env.NEXT_PUBLIC_DEFAULT_LOGO
                }
                alt="logo"
                width={80}
                height={80}
                className="object-contain"
              />
          </div>

          <div className="hidden md:flex flex-col">
            <h1 className="text-4xl font-semibold font-serif">
              {restaurantDetails?.name}
            </h1>
            <p className="text-sm text-richWhite-700 font-serif">
              {restaurantDetails?.description}
            </p>
          </div>
        </div>
      </motion.div>

      <div
        onClick={() => setIsCartOpen(true)}
        className="relative pr-2 cursor-pointer"
      >
        <ShoppingCart className="scale-150" />
        {
          totalItem > 0 && <p className="text-xs px-2 font-semibold py-1 rounded-full text-center bg-rRed text-rGray absolute -right-1 -top-4">
          {totalItem}
        </p>
        }
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
