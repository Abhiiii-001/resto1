"use client";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch } from "@/redux/redux";
import { setEatingLocation } from "@/redux/states/cartSlice";
import { Clock, MapPin, Utensils, ShoppingBag } from "lucide-react";

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
      <div className="min-h-screen bg-background flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-9 w-9 border-2 border-primary border-t-transparent" />
          <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top Bar */}
      <div className="h-16 px-4 lg:px-8 w-full border-b border-gray-100 bg-white z-30 sticky top-0 shadow-sm">
        <Header backUrl="/restaurants" showCart={false} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto w-full">

        {/* Restaurant Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[2.5rem] shadow-soft-lg p-8 flex flex-col items-center mb-8 w-full text-center border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-100/50 rounded-full blur-2xl pointer-events-none" />

          <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center overflow-hidden mb-5 shadow-sm border border-gray-100 p-1">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO || "/burger.webp"}
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">
            {restaurantDetails?.name}
          </h1>

          <p className="text-xs text-gray-500 mb-4 font-medium max-w-xs leading-relaxed">
            {restaurantDetails?.slogan || "Welcome! How would you like to order today?"}
          </p>

          <div className="flex items-center gap-2 mb-2">
            {restaurantDetails?.address && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <MapPin size={11} className="text-gray-400" />
                {restaurantDetails.address}
              </span>
            )}
          </div>

          {restaurantDetails?.isOpen ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-success text-xs font-bold border border-green-100">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Open Now for Orders
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-danger text-xs font-bold border border-red-100">
              <span className="w-2 h-2 rounded-full bg-danger" />
              Currently Closed
            </div>
          )}
        </motion.div>

        {/* Order Type Selection */}
        <AnimatePresence>
          {restaurantDetails.isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full"
            >
              <h2 className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Select Order Type
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Eat In */}
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center gap-3 cursor-pointer shadow-soft hover:shadow-soft-lg transition-all group hover:border-primary/30"
                  onClick={() => {
                    dispatch(setEatingLocation(false));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <Utensils size={28} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Dine-In
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Eat at table</span>
                </motion.button>

                {/* Take Out */}
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center gap-3 cursor-pointer shadow-soft hover:shadow-soft-lg transition-all group hover:border-primary/30"
                  onClick={() => {
                    dispatch(setEatingLocation(true));
                    startTransition(() => {
                      router.push(`/${restaurantId}/menu`);
                    });
                  }}
                >
                  <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <ShoppingBag size={28} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Takeaway
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Pack & Go</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-100 rounded-3xl shadow-soft p-8 text-center w-full"
            >
              <div className="w-14 h-14 bg-red-50 text-danger rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7" />
              </div>
              <p className="text-base font-bold text-gray-900 mb-1">Restaurant is Currently Closed</p>
              <p className="text-xs text-gray-500 font-medium">
                Please check back during operational hours to place orders.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RestaurantPage;
