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
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-md transition-all"
      onClick={() => setClickedProduct(data)}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-rGray overflow-hidden">
        <Image
          src={data?.thumbnail || "/burger.webp"}
          alt={data.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{data.name}</p>
          {lowestPrice !== null && (
            <p className="text-xs font-semibold text-rRed mt-0.5">
              From ₹{lowestPrice}
            </p>
          )}
        </div>
        <div className="w-8 h-8 rounded-xl bg-rRed flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
          <Plus size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
