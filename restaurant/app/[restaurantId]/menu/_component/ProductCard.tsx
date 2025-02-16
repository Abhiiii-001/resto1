"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { ProductInterface } from "@/redux/api/data";

type Props = {
  data: ProductInterface;
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>
};

function ProductCard({ data , setClickedProduct }: Props) {
  return (
    <motion.div
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className=" py-2 cursor-pointer"
      onClick={() => setClickedProduct(data)}
        
    >
      <div className="flex flex-col items-center justify-center gap-1 ">
        <Image src={data?.thumbnail || "/burger.webp"} alt="product" height={250} width={250} className="" />
        <p className="text-lg font-semibold text-gray-800">{data.name}</p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
