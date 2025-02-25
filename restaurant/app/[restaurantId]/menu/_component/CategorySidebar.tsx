"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Mousewheel, Scrollbar } from "swiper/modules";
import Category from "./Category";
import Skeleton from "@/app/_component/Skelton";

type Props = {};

const items = [
  { id: 1, name: "Burger", image: "/images/burger.png" },
  { id: 2, name: "Fries", image: "/images/fries.png" },
  { id: 3, name: "Pizza", image: "/images/pizza.png" },
  { id: 4, name: "Soda", image: "/images/soda.png" },
  { id: 5, name: "Ice Cream", image: "/images/ice-cream.png" },
  { id: 6, name: "Coffee", image: "/images/coffee.png" },
];

function CategorySidebar({ data, selectedCategory, setSelectedCategory }: any) {
  console.log("Category slider data", data);
  useEffect(() => {
    if(data) setSelectedCategory(data[0]);
  },[data])

  return (
    <div className="h-full">
      <Swiper
        modules={[Scrollbar, Mousewheel, EffectCoverflow]}
        direction={"vertical"}
        slidesPerView={4}
        effect="coverflow"
        centeredSlides={true}
        mousewheel={{ releaseOnEdges: false }}
        loop={true}
        grabCursor={true}
        scrollbar={{ draggable: data ? true : false }}
        spaceBetween={20}
        onSlideChange={(swiper) =>{ if(data) setSelectedCategory(data[swiper.realIndex])}}
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 100, // More depth for a better 3D effect
          modifier: 1,
          slideShadows: false,
        }}
        className="h-[88vh] lg:screen px-1 transition-all duration-200 z-1"
        style={{ zIndex: 0 }}
      >
        {data ? (
          data.length > 0 ? (
            data.map((item: any) => {
              return (
                <SwiperSlide
                  key={item.id}
                  className={`${
                    item.id === selectedCategory?.id
                      ? "bg-rRed text-white"
                      : "bg-rGray"
                  }  lg:h-[400px] md:h-[200px] flex items-center justify-center py-2  rounded-xl border-white`}
                >
                  <Category data={item} />
                </SwiperSlide>
              );
            })
          ) : (
            <p>No category added</p>
          )
        ) : (
          [...Array(6)].map((_, index) => (
            <SwiperSlide key={index} className="w-24 md:w-32 lg:64 flex flex-col items-center justify-center gap-1 mt-4 md:mt-6">
              <Skeleton additionalClass="w-full aspect-square rounded-xl" />
              <Skeleton additionalClass="w-full h-4 mt-1 rounded-xl" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default CategorySidebar;
