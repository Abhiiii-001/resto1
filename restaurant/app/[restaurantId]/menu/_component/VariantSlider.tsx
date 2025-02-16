import Skeleton from "@/app/_component/Skelton";
import { ProductVariantsInterface } from "@/redux/api/data";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  EffectCoverflow,
  Mousewheel,
  Parallax,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Props = {
  data: ProductVariantsInterface[];
  currentVariant: ProductVariantsInterface | undefined;
  setCurrentVariant: Dispatch<SetStateAction<ProductVariantsInterface>>
};

function VariantSlider({ data ,currentVariant , setCurrentVariant}: Props) {
  // console.log("Variant slider data",data);

  return (
    <div className="w-full ">
      <Swiper
        modules={[Scrollbar, Mousewheel, Parallax]}
        direction={"horizontal"}
        slidesPerView={3}
        // effect="parallax"
        centeredSlides={true}
        mousewheel={{ releaseOnEdges: false }}
        initialSlide={data?.length / 2 + 1}
        loop={true}
        grabCursor={true}
        scrollbar={{ draggable: false }}
        spaceBetween={10}
        onSlideChange={(swiper) => {
          if (data) setCurrentVariant(data[swiper.realIndex]);
        }}
        className="w-full transition-all duration-200 py-4"
      >
        {data ? (
          data.length > 0 ? (
            data.map((item: ProductVariantsInterface) => {
              return (
                <SwiperSlide
                  key={item.id}
                  className="flex w-full flex-col items-center justify-center font-serif"
                >
                  {/* Image Contianer  */}
                  <div className="flex w-full items-center justify-center">
                  <div
                    className={`${
                      item.id === currentVariant?.id
                        ? "bg-rRed text-white scale-125"
                        : "bg-rGray border"
                    } h-fit w-24 lg:36 aspect-square flex items-center my-4 justify-center shadow-sm  rounded-full border-white -pr-5`}
                  >
                    <Image
                      src={"/burger.webp"}
                      alt="burger"
                      width={180}
                      height={180}
                      className="drop-shadow-xl"
                    />
                  </div>
                  </div>

                  {/* price and size  */}
                  <div className="mt-8 flex flex-col w-full gap-1 items-center justify-center text-[1rem]">
                    <div>
                      {item.size.length > 8
                        ? item?.size.substring(0, 6) + "..."
                        : item?.size}
                    </div>
                    <div className="text-sm font-bold text-richYellow-500">
                      ₹{item.price}
                    </div>
                  </div>

                  
                </SwiperSlide>
              );
            })
          ) : (
            <p>No category added</p>
          )
        ) : (
          [...Array(3)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="w-24 flex flex-col items-center justify-center gap-1 mt-4 md:mt-6"
            >
              <Skeleton additionalClass="w-full aspect-square rounded-full" />
              <Skeleton additionalClass="w-full h-4 mt-1 rounded-xl" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

function VariantCard({ data }: { data: ProductVariantsInterface }) {
  return <div></div>;
}

export default VariantSlider;
