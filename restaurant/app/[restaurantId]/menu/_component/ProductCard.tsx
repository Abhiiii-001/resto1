"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { ProductInterface } from "@/redux/api/data";
import { Plus } from "lucide-react";

type Props = {
  data: ProductInterface;
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>;
};

function ProductCard({ data, setClickedProduct }: Props) {
  // Get the lowest price from variants
  const lowestPrice = data?.productVariants?.length
    ? Math.min(...data.productVariants.map((v) => v.price))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6, rotate: 1 }}
      className="bg-white rounded-[2rem] shadow-[6px_6px_0px_#111] hover:shadow-[10px_10px_0px_#111] border-4 border-gray-900 overflow-hidden cursor-pointer group transition-all"
      onClick={() => setClickedProduct(data)}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-rYellow overflow-hidden border-b-4 border-gray-900">
        <Image
          src={data?.thumbnail || "/burger.webp"}
          alt={data.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex items-center justify-between gap-2 bg-white">
        <div className="flex-1 min-w-0">
          <p className="text-base font-black text-gray-900 truncate uppercase tracking-tighter">{data.name}</p>
          {lowestPrice !== null && (
            <p className="text-xs font-black uppercase tracking-wider bg-rRed text-white px-2.5 py-0.5 rounded-full border-2 border-gray-900 inline-block mt-1 shadow-[2px_2px_0px_#111]">
              From ₹{lowestPrice}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-2xl bg-rYellow border-2 border-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-rRed group-hover:text-white transition-colors shadow-[2px_2px_0px_#111]">
          <Plus size={20} className="text-gray-900 group-hover:text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
