"use client";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch } from "@/redux/redux";
import { setEatingLocation } from "@/redux/states/cartSlice";
import { ArrowLeft } from "lucide-react";

import Header from "./menu/_component/Header";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsInterface | undefined>();

  const { data: restaurantData, isLoading: restaurantDetailsLoader } =
    useGetRestaurantDetailsQuery(restaurantId as string);

  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);

  if (restaurantDetailsLoader || !restaurantDetails) {
    return (
      <div className="min-h-screen bg-rGray flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rRed" />
          <p className="text-gray-500 font-medium">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-rGray flex flex-col font-sans selection:bg-gray-900 selection:text-white">
      {/* Top Bar */}
      <div className="h-20 px-4 lg:px-8 w-full border-b-4 border-gray-900 bg-white z-30 sticky top-0">
        <Header backUrl="/restaurants" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* Restaurant Info Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] border-4 border-gray-900 shadow-[10px_10px_0px_#111] p-8 flex flex-col items-center mb-10 w-full max-w-md text-center"
        >
          <div className="w-28 h-28 rounded-3xl border-4 border-gray-900 bg-rYellow flex items-center justify-center overflow-hidden mb-6 shadow-[4px_4px_0px_#111]">
            <Image
              src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
              alt="logo"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-black text-gray-900 text-center mb-2 uppercase tracking-tighter">
            {restaurantDetails?.name}
          </h1>
          <p className="text-base text-gray-800 text-center font-bold max-w-xs mb-4">
            {restaurantDetails?.slogan || "Welcome! How would you like to order?"}
          </p>
          {restaurantDetails?.isOpen ? (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rGreen text-white border-2 border-gray-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111]">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              Open Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rRed text-white border-2 border-gray-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111]">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              Currently Closed
            </span>
          )}
        </motion.div>

        {/* Order Type Selection */}
        <AnimatePresence>
          {restaurantDetails.isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full max-w-md"
            >
              <p className="text-center text-lg font-black text-gray-900 uppercase tracking-wider mb-6 bg-white py-2 px-4 border-2 border-gray-900 shadow-[3px_3px_0px_#111] inline-block w-full text-center">
                Where would you like to eat?
              </p>
              <div className="grid grid-cols-2 gap-6">
                {/* Eat In */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4, rotate: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-rYellow border-4 border-gray-900 rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-pointer shadow-[8px_8px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all group"
                  onClick={() => {
                    dispatch(setEatingLocation(false));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-20 h-20 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111] group-hover:rotate-6 transition-transform">
                    <Image src="/eatIn.png" alt="eat-in" height={60} width={60} />
                  </div>
                  <span className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                    Eat In
                  </span>
                </motion.button>

                {/* Take Out */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4, rotate: 1 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-rRed text-white border-4 border-gray-900 rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-pointer shadow-[8px_8px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all group"
                  onClick={() => {
                    dispatch(setEatingLocation(true));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-20 h-20 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111] group-hover:rotate-[-6deg] transition-transform">
                    <Image src="/takeOut.png" alt="take-out" height={60} width={60} />
                  </div>
                  <span className="text-xl font-black text-white uppercase tracking-tighter">
                    Take Out
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rRed text-white border-4 border-gray-900 rounded-[2rem] shadow-[8px_8px_0px_#111] p-8 text-center max-w-md w-full"
            >
              <p className="text-5xl mb-3">🔒</p>
              <p className="text-2xl font-black uppercase tracking-tight mb-2">Restaurant is closed</p>
              <p className="text-base text-red-100 font-bold">
                Please check back later. We&apos;ll be ready to serve you soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RestaurantPage;
