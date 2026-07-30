"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel, Scrollbar } from "swiper/modules";
import Category from "./Category";
import Skeleton from "@/app/_components/Skelton";
import { CategoryInterface } from "@/redux/api/data";

type Props = {
  data: CategoryInterface[] | undefined;
  selectedCategory: CategoryInterface | undefined;
  setSelectedCategory: (category: CategoryInterface) => void;
};

function CategorySidebar({ data, selectedCategory, setSelectedCategory }: Props) {
  useEffect(() => {
    if (data && data.length > 0) setSelectedCategory(data[0]);
  }, [data, setSelectedCategory]);

  return (
    <div className="h-full bg-white border-r border-gray-100">
      <Swiper
        modules={[Scrollbar, Mousewheel]}
        direction={"vertical"}
        slidesPerView={"auto"}
        mousewheel={{ releaseOnEdges: false }}
        grabCursor={true}
        scrollbar={{ draggable: !!data }}
        spaceBetween={4}
        onSlideChange={(swiper) => {
          if (data && data[swiper.realIndex]) setSelectedCategory(data[swiper.realIndex]);
        }}
        className="h-full px-2 py-4"
        style={{ zIndex: 0 }}
      >
        {data ? (
          data.length > 0 ? (
            data.map((item: CategoryInterface) => (
              <SwiperSlide
                key={item.id}
                style={{ height: "auto" }}
                className={`rounded-xl transition-all duration-200 ${
                  item.id === selectedCategory?.id
                    ? "bg-primary/5"
                    : "bg-transparent hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(item)}
              >
                <Category data={item} isActive={item.id === selectedCategory?.id} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide style={{ height: "auto" }}>
              <p className="text-xs text-gray-400 text-center p-4 font-medium">No categories</p>
            </SwiperSlide>
          )
        ) : (
          [...Array(6)].map((_, index) => (
            <SwiperSlide key={index} style={{ height: "auto" }} className="p-2">
              <Skeleton additionalClass="w-full aspect-square rounded-xl" />
              <Skeleton additionalClass="w-3/4 h-3 mt-2 mx-auto rounded-xl" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default CategorySidebar;
