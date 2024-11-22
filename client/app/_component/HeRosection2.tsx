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
    <div className="bg-custom-gray w-full h-screen">

        <div className="h-2/5 w-full flex">
        <div className="h-full w-1/2 flex justify-center items-center">
            <p className="text-[36px] font-bold leading-[55px]">Who are we?</p>
        </div>
        <div className="h-full w-1/2 flex justify-center items-center">
            <p className="text-[9px] leading-[12px] w-3/5">Vulputate in elit tincidunt elit scelerisque
                 massa fusce pharetra. Sagittis gravida lacus
                  quisque dictum non pretium suspendisse porttitor.
                   Risus adipiscing semper ornare velit. Sagittis consequat 
                   luctus leo arcu. Aenean nunc accumsan id maecenas. Tortor.</p>
        </div>
        </div>
        <PhotoCarousel images={imageUrls}/>
    </div>
  )
}

export default HeRosection2