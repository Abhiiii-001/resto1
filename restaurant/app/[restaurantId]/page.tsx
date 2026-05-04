"use client";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch } from "@/redux/redux";
import { setEatingLocation } from "@/redux/states/cartSlice";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-rGray flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-medium text-gray-500">Back to Restro</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* Restaurant Info Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center mb-12 w-full max-w-sm"
        >
          <div className="w-24 h-24 rounded-2xl border border-gray-100 bg-rGray flex items-center justify-center overflow-hidden mb-5 shadow-sm">
            <Image
              src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
              alt="logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
            {restaurantDetails?.name}
          </h1>
          <p className="text-sm text-gray-500 text-center font-medium">
            {restaurantDetails?.slogan || "Welcome! How would you like to order?"}
          </p>
          {restaurantDetails?.isOpen ? (
            <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Open Now
            </span>
          ) : (
            <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-rRed text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rRed" />
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
              className="w-full max-w-sm"
            >
              <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Where would you like to eat?
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Eat In */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border-2 border-gray-100 hover:border-rRed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition-all group"
                  onClick={() => {
                    dispatch(setEatingLocation(false));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image src="/eatIn.png" alt="eat-in" height={60} width={60} />
                  </div>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-rRed transition-colors">
                    Eat In
                  </span>
                </motion.button>

                {/* Take Out */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border-2 border-gray-100 hover:border-rRed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition-all group"
                  onClick={() => {
                    dispatch(setEatingLocation(true));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image src="/takeOut.png" alt="take-out" height={60} width={60} />
                  </div>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-rRed transition-colors">
                    Take Out
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-100 rounded-2xl px-8 py-6 text-center max-w-sm w-full"
            >
              <p className="text-2xl mb-3">🔒</p>
              <p className="text-gray-800 font-bold mb-1">Restaurant is closed</p>
              <p className="text-sm text-gray-500 font-medium">
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
