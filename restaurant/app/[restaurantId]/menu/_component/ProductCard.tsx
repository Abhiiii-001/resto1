"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { ProductInterface } from "@/redux/api/data";
import { Plus, AlertCircle } from "lucide-react";

type Props = {
  data: ProductInterface;
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>;
};

function ProductCard({ data, setClickedProduct }: Props) {
  const lowestPrice = data?.productVariants?.length
    ? Math.min(...data.productVariants.map((v) => v.price))
    : null;

  const allVariantsOutOfStock = data?.productVariants?.length > 0 &&
    data.productVariants.every((v) => v.isOutOfStock);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl shadow-soft hover:shadow-soft-md border border-gray-100 overflow-hidden cursor-pointer group transition-all flex flex-col font-sans"
      onClick={() => setClickedProduct(data)}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={data?.thumbnail || "/burger.webp"}
          alt={data.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            allVariantsOutOfStock ? "grayscale opacity-60" : ""
          }`}
        />
        {allVariantsOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-red-600/90 px-3 py-1 rounded-full shadow-sm">
              <AlertCircle size={12} />
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">
            {data.name}
          </h4>
          {lowestPrice !== null && (
            <p className="text-xs font-bold text-primary">
              ₹{lowestPrice}
              {data.productVariants.length > 1 && (
                <span className="text-[10px] font-medium text-gray-400 ml-1">onwards</span>
              )}
            </p>
          )}
        </div>
        
        {/* ADD Button */}
        <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium">
            {data.productVariants.length} option{data.productVariants.length !== 1 ? "s" : ""}
          </span>
          <button 
            disabled={allVariantsOutOfStock}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
              allVariantsOutOfStock
                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                : "bg-orange-50 text-primary border border-orange-200 group-hover:bg-primary group-hover:text-white"
            }`}
          >
            ADD
            <Plus size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
