import Image from "next/image";
import React from "react";
import { CategoryInterface } from "@/redux/api/data";

type Props = {
  data: CategoryInterface;
  isActive?: boolean;
};

function Category({ data, isActive }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 py-3 cursor-pointer group">
      {/* Circle image — fully filled, clipped */}
      <div
        className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 border-2 border-gray-900 ${
          isActive
            ? "bg-rYellow ring-4 ring-gray-900 scale-110 shadow-[3px_3px_0px_#111]"
            : "bg-white group-hover:scale-105"
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
        className={`text-xs font-black uppercase tracking-tight text-center leading-tight transition-colors ${
          isActive ? "text-gray-900 bg-rYellow px-1.5 py-0.5 rounded border border-gray-900" : "text-gray-700"
        }`}
      >
        {data?.name}
      </p>
    </div>
  );
}

export default Category;
