"use client";
import React, { useState, useEffect } from "react";

const EventGallery: React.FC = () => {
  const images = [
    { src: "/event1.png", title: "Corporate Events" },
    { src: "/event2.png", title: "Office" },
    { src: "/event3.png", title: "Parties" },
    { src: "/event4.png", title: "Social Gatherings" },
  ];

  const [currentImages, setCurrentImages] = useState(images);

// //   // Function to replace a random image
//   const replaceRandomImage = () => {
//     const randomIndex = Math.floor(Math.random() * images.length);
//     const newImages = [...currentImages];
//     newImages[randomIndex] = images[randomIndex];
//     setCurrentImages(newImages);
//   };

//   // Change one random image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       replaceRandomImage();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="w-full min-h-screen bg-custom-gray p-4 flex justify-center flex-col items-center">
      {/* Heading */}
      <div className="flex  w-full  justify-center">
        <h1 className="text-3xl font-bold text-gray-800  text-center">Events</h1>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-12">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="relative group w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-md"
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-lg font-bold text-gray-800">{image.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGallery;
