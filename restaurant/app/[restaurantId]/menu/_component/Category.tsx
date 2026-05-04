import Image from "next/image";
import React from "react";
import { CategoryInterface } from "@/redux/api/data";

type Props = {
  data: CategoryInterface;
  isActive?: boolean;
};

function Category({ data, isActive }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 py-3 cursor-pointer">
      {/* Circle image — fully filled, clipped */}
      <div
        className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 ${
          isActive
            ? "ring-3 ring-white ring-offset-2 ring-offset-rRed scale-110 shadow-md"
            : "ring-2 ring-gray-200"
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
        className={`text-xs font-bold text-center leading-tight transition-colors ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {data?.name}
      </p>
    </div>
  );
}

export default Category;
