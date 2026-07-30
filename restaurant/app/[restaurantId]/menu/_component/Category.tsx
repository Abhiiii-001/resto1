"use client";
import Image from "next/image";
import React from "react";
import { CategoryInterface } from "@/redux/api/data";

type Props = {
  data: CategoryInterface;
  isActive?: boolean;
};

function Category({ data, isActive }: Props) {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 p-2 lg:px-4 lg:py-3 cursor-pointer transition-all rounded-2xl ${
        isActive
          ? "bg-primary text-white shadow-sm"
          : "bg-transparent hover:bg-gray-50 text-gray-700"
      }`}
    >
      <div
        className={`relative w-10 h-10 lg:w-9 lg:h-9 rounded-xl overflow-hidden flex-shrink-0 transition-transform ${
          isActive ? "scale-105" : "bg-gray-100"
        }`}
      >
        <Image
          src={data?.thumbnail || "/burger.webp"}
          alt={data?.name || "category"}
          fill
          className="object-cover"
        />
      </div>
      <p
        className={`text-xs font-bold truncate max-w-[80px] lg:max-w-full text-center lg:text-left ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {data?.name}
      </p>
    </div>
  );
}

export default Category;
