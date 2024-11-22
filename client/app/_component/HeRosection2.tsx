"use client";
import React from "react";
import PhotoCarousel from "./ImgSweeper";

function HeRosection2() {
  const imageUrls = [
    "/item1.png",
    "/item2.png",
    "/item3.png",
    "/item4.png",  
  ];

  return (
    <div className="bg-custom-gray w-full h-screen flex flex-col">
      {/* Section for text */}
      <div className="h-2/5 w-full flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="h-1/2 md:h-full w-full md:w-1/2 flex justify-center items-center">
          <p className="text-[28px] sm:text-[36px] font-bold leading-[40px] sm:leading-[55px] text-center">
            Who are we?
          </p>
        </div>

        {/* Right Column */}
        <div className="h-1/2 md:h-full w-full md:w-1/2 flex justify-center items-center">
          <p className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] w-4/5 md:w-3/5 text-center">
            Vulputate in elit tincidunt elit scelerisque massa fusce pharetra. Sagittis gravida 
            lacus quisque dictum non pretium suspendisse porttitor. Risus adipiscing semper ornare 
            velit. Sagittis consequat luctus leo arcu. Aenean nunc accumsan id maecenas. Tortor.
          </p>
        </div>
      </div>

      {/* Photo Carousel */}
      <PhotoCarousel images={imageUrls} />
    </div>
  );
}

export default HeRosection2;
