"use-client"
import React from "react";

const steps = [
  {
    id: 1,
    title: "Scan QR",
    description: "Scan the QR code to explore the menu.",
    image: "/scan-qr.jpg",
  },
  {
    id: 2,
    title: "Order Food",
    description: "Choose your favorite dishes and place your order.",
    image: "/order-food.jpg",
  },
  {
    id: 3,
    title: "Payment",
    description: "Pay karo warna ghar jao!",
    image: "/payment.jpg",
  },
  {
    id: 4,
    title: "Order Received",
    description: "Receive your delicious meal and enjoy!",
    image: "/order-received.jpg",
  },
];

const HowItWorks = () => {
  return (
    <section className=" sm:h-[202vh]   lg:h-screen bg-gray-400 flex flex-col justify-center items-center px-6">
      {/* Heading main */}
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">How It Works</h2>
      
      {/* Steps */}
      <div className="lg:h-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transition-all
             duration-300 hover:cursor-pointer transform hover:scale-105 hover:shadow-xl"
          >
            {/* Image in the upper half */}
            <div className="lg:h-[60%] aspect-video bg-gray-200 md:h-[278px]">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/*     lower half */}
            <div className="p-4 sm:p-6 text-center flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
