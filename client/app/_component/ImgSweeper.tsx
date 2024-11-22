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
        spaceBetween={20} // gap between image
        slidesPerView={3} // kitne image per slide
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-4/5 object-cover"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-[500px] h-[320px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;
