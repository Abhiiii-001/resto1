import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import { motion } from "motion/react";
import { easeInOut, easeOut } from "motion";
import { Info, InfoIcon, LucideInfo, Minus, Plus, X } from "lucide-react";
import { ProductInterface, ProductVariantsInterface } from "@/redux/api/data";
import VariantSlider from "./VariantSlider";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { addToCart, removeToCart } from "@/redux/states/cartSlice";

type Props = {
  clickedProduct: ProductInterface;
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>;
};

function VariantModal({ clickedProduct, setClickedProduct }: Props) {
  const [currentVariant, setCurrentVariant] =
    useState<ProductVariantsInterface>(
      clickedProduct.productVariants[
        clickedProduct.productVariants.length / 2 + 1
      ]
    );

  const { totalAmount, totalItem, orders } = useAppSelector(
    (state) => state.cart
  );
  console.log("Orders", orders);

  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const existing = orders.find((item) => item.variant.id === currentVariant?.id);
    if (existing) {
      setQuantity(existing.quantity);
    } else {
      setQuantity(0);
    }
  }, [currentVariant, orders]);

  const dispatch = useAppDispatch();

  return (
    <div className="w-screen h-screen fixed bg-black bg-opacity-20 inset-0 backdrop-blur-md">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        className="w-full lg:w-80 h-3/4 flex flex-col pb-6 justify-between lg:min-w-[600px] px-4 absolute rounded-t-[40px] lg:h-4/6 bottom-0 md:top-[20%] lg:left-[35%] lg:rounded-3xl bg-white"
      >
        <div className="flex w-full">
          {/* Close btn  */}
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => setClickedProduct(null)}
              className="bg-richWhite-600 bg-opacity-30 rounded-b-2xl px-8 py-4 text-richWhite-800"
            >
              <X />
            </button>
          </div>
        </div>

        

        <div className="">
        <div className="flex w-full flex-col items-center justify-between mb-10">
          <div className="font-serif text-2xl font-semibold">
            {clickedProduct?.name}
          </div>
          <div className="text-xs font-semibold text-richWhite-700">
            {clickedProduct?.description}
          </div>
        </div>
          {/* Varinat slider */}
          <VariantSlider
            data={clickedProduct?.productVariants}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
          />

          {/* btns */}
          <div className="w-full flex items-center justify-center mt-10">
            <div className="flex items-center gap-1">
              <div
                onClick={() =>
                  dispatch(
                    removeToCart({ variant: currentVariant, quantity: 1 })
                  )
                }
                className="border cursor-pointer px-3 flex items-center justify-center font-bold text-sm py-[0.10rem] border-richWhite-600 rounded-lg"
              >
                -
              </div>

              <div className="mx-2 font-serif fontsb">{quantity}</div>

              <div
                onClick={() =>
                  dispatch(
                    addToCart({
                      variant: currentVariant,
                      quantity: 1,
                      product: clickedProduct
                    })
                  )
                }
                className="border cursor-pointer px-3 font-bold flex items-center justify-center text-sm py-[0.10rem] border-richYellow-400 rounded-lg bg-richYellow-300"
              >
                +
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setClickedProduct(null)}
          className="w-full px-32 mx-auto py-2 rounded-lg font-serif bg-richYellow-400 hover:ring-richYellow-600 transition-all duration-200"
        >
          Done
        </button>
      </motion.div>
    </div>
  );
}

export default VariantModal;
