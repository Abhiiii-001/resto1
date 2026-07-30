"use client";
import Skeleton from "@/app/_components/Skelton";
import { ProductVariantsInterface } from "@/redux/api/data";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  data: ProductVariantsInterface[];
  currentVariant: ProductVariantsInterface | undefined;
  setCurrentVariant: Dispatch<SetStateAction<ProductVariantsInterface>>;
  thumbnail?: string;
};

function VariantSlider({ data, currentVariant, setCurrentVariant, thumbnail }: Props) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Scrollbar, Mousewheel]}
        direction="horizontal"
        slidesPerView={3}
        centeredSlides={true}
        mousewheel={{ releaseOnEdges: false }}
        initialSlide={0}
        loop={data?.length > 3}
        grabCursor={true}
        spaceBetween={16}
        onSlideChange={(swiper) => {
          if (data && data[swiper.realIndex]) setCurrentVariant(data[swiper.realIndex]);
        }}
        className="w-full py-4 overflow-visible"
      >
        {data ? (
          data.length > 0 ? (
            data.map((item: ProductVariantsInterface) => {
              const isActive = item.id === currentVariant?.id;
              const isOutOfStock = Boolean(item.isOutOfStock);

              return (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-col items-center justify-center overflow-visible cursor-pointer"
                  onClick={() => setCurrentVariant(item)}
                >
                  {/* Circle image */}
                  <div className="flex w-full items-center justify-center pt-3 pb-2">
                    <div
                      className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 border-2 ${
                        isActive
                          ? isOutOfStock
                            ? "border-danger scale-105 shadow-sm"
                            : "border-primary scale-105 shadow-sm"
                          : "border-transparent bg-gray-50 opacity-70 scale-95"
                      }`}
                    >
                      <Image
                        src={thumbnail || "/burger.webp"}
                        alt={item.size}
                        fill
                        className={`object-cover p-0.5 rounded-full ${
                          isOutOfStock ? "grayscale opacity-60" : ""
                        }`}
                      />
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-[10px] font-black text-white uppercase text-center px-1 leading-tight">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Size + price */}
                  <div className="flex flex-col items-center gap-0.5 mt-1 text-center">
                    <span
                      className={`text-xs font-semibold truncate max-w-[85px] ${
                        isActive
                          ? isOutOfStock
                            ? "text-danger"
                            : "text-primary font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {item.size.length > 9 ? item.size.substring(0, 8) + "…" : item.size}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        isActive ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      ₹{item.price}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide>
              <p className="text-sm text-gray-400 text-center py-4">No variants available</p>
            </SwiperSlide>
          )
        ) : (
          [...Array(3)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Skeleton additionalClass="w-20 h-20 rounded-full" />
              <Skeleton additionalClass="w-16 h-3 rounded-full" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default VariantSlider;
