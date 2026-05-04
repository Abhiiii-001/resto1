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
              return (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-col items-center justify-center overflow-visible"
                  onClick={() => setCurrentVariant(item)}
                >
                  {/* Circle image — product thumbnail, fully filled, clipped */}
                  <div className="flex w-full items-center justify-center pt-3 pb-2">
                    <div
                      className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? "ring-4 ring-rRed ring-offset-2 scale-110 shadow-lg"
                          : "ring-2 ring-gray-200 opacity-70"
                      }`}
                    >
                      <Image
                        src={thumbnail || "/burger.webp"}
                        alt={item.size}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Size + price */}
                  <div className="flex flex-col items-center gap-0.5 mt-2">
                    <span
                      className={`text-xs font-bold truncate max-w-[80px] text-center ${
                        isActive ? "text-rRed" : "text-gray-500"
                      }`}
                    >
                      {item.size.length > 8 ? item.size.substring(0, 7) + "…" : item.size}
                    </span>
                    <span
                      className={`text-sm font-black ${
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
