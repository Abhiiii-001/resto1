import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

type Props = {};

function Category({ data }: any) {
  return (
    <motion.div
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="flex flex-col items-center justify-center gap-1 mt-4 md:mt-6 lg:mt-0 pb-2"
    >
      <Image src={data?.thumbnail || "/burger.webp"} alt="category" width={180} height={180} />
      <p className="text-sm lg:text-lg mb-2 font-semibold font-serif">
        {" "}
        {data?.name}
      </p>
    </motion.div>
  );
}

export default Category;
