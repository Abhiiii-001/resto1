import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  images: string[]; // 
}

const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="w-full h-3/5">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={20} // Gap between images
        breakpoints={{
          // Breakpoints for responsiveness
          320: {
            slidesPerView: 1, // 1 slide for small screens
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2, // 2 slides for medium screens
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3, // 3 slides for larger screens
            spaceBetween: 20,
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-4/5 object-cover"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-full h-[320px] sm:h-[240px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;
