"use client";
import { useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeOut } from "motion";
import { useAppDispatch } from "@/redux/redux";
import { setEatingLocation } from "@/redux/states/cartSlice";

type Props = {};

const page = (props: Props) => {
  const { restaurantId } = useParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [restaurantDetails,setRestaurantDetails] = useState();

   const {data: restaurantData,isLoading: restaurantDetailsLoader} = useGetRestaurantDetailsQuery(restaurantId);
   useEffect(() => {
      if(restaurantData){
          setRestaurantDetails(restaurantData?.data)
      }
   },[restaurantData])
   //console.log("Restaurant Details",restaurantDetails);

  if(restaurantDetailsLoader || !restaurantDetails){
    return <div>
      Loading....
    </div>
  }

  // const restaurantDetails = {
  //   name: "RestroHub",
  //   description: "The best restaurant ever you see",
  //   thumbnail:
  //     "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732730028/my-files/uyogxd3ahq36t5qc8cch.png",
  //   isOpen: true,
  // };

  return (
    <div className=" w-full h-[100vh] bg-[#EFECE5] overflow-hidden relative">
      <div className="lg:w-10/12 px-2 mx-auto h-full pt-8 pb-12 flex flex-col justify-between items-start relative">
        {/* Restaurant header and logo */}
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="">
          <div className="flex items-center gap-2 ">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-richYellow-500 ">
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

            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold font-serif">
                {restaurantDetails?.name}
              </h1>
              <p className="text-sm text-richWhite-700 font-serif">
                {restaurantDetails?.slogan}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fixed Description */}
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="w-full h-60">
          <div className="w-full font-bold font-serif text-center text-4xl">
            <div>Where would you like to eat today!!</div>
          </div>
        </motion.div>

      <AnimatePresence>
        {/* button */}
        <motion.div
      
        className="h-50 w-full flex items-center justify-center z-10 ">
         {
          restaurantDetails.isOpen ? (
            <div className="flex items-center gap-10">
              
                <motion.div
                initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale:10 }}
                  transition={{
                      duration: 0.4,
                      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                className="rounded-xl bg-rGray px-4 cursor-pointer hover:shadow-xl"
                onClick={() => {
                  dispatch(setEatingLocation(false));
                  startTransition(() => {
                    router.push(`/${restaurantId}/menu`);
                 })
                }}
                >

                  <div className="w-24 h-24 flex items-center justify-center">
                    <Image src={"/eatIn.png"}  alt="eat-in" height={90} width={90} />
                  </div>
                  <p className="pb-4 w-full text-center text-sm font-serif font-semibold">Eat in</p>

                </motion.div>

                <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, width: "100vw",height:"100vh" }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className="rounded-xl bg-rGray px-4 cursor-pointer hover:shadow-xl"
                onClick={() => {
                  dispatch(setEatingLocation(true));
                  startTransition(() => {
                    router.push(`/${restaurantId}/menu`);
                 })
                }}
                >
                  <div className="w-24 h-24 flex items-center justify-center">
                    <Image src={"/takeOut.png"}  alt="take-out" height={150} width={130} />
                  </div>
                  <p className="pb-4 w-full text-center text-sm font-serif font-semibold">Take out</p>
                </motion.div>

              
            </div>
          ) :(
            <div className="max-w-64 rounded-xl cursor-not-allowed w-full py-3 text-center font-semibold font-serif text-sm bg-rGray">
              Shop is currently closed!
            </div>
          )
         }
        </motion.div>
      </AnimatePresence>

        {/* Circle */}
        <motion.div 
        initial={{x: -250,y: 250}}
        animate = {{x:0 , y: 0}}
        exit={{x: -250,y: 250}}
        transition={{ duration:0.4,ease:easeOut}}
        className="w-[700px] h-[700px] border-2 border-white z-1 absolute -bottom-[400px] -left-[250px] md:w-[1500px] md:h-[1500px] md:-bottom-[1100px] lg:h-[2500px] lg:w-[2500px] lg:-bottom-[2100px] rounded-full  bg-richYellow-500 lg:right-[350px] " 
        />

      </div>
    </div>
  );
};

export default page;
