import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { ProductInterface, ProductVariantsInterface } from "@/redux/api/data";
import VariantSlider from "./VariantSlider";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { addToCart, removeToCart } from "@/redux/states/cartSlice";

type Props = {
  clickedProduct: ProductInterface;
  setClickedProduct: Dispatch<SetStateAction<ProductInterface | null>>;
};

function VariantModal({ clickedProduct, setClickedProduct }: Props) {
  const [currentVariant, setCurrentVariant] = useState<ProductVariantsInterface>(
    clickedProduct.productVariants[0]
  );

  const { orders } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existing = orders.find((item) => item.variant.id === currentVariant?.id);
    setQuantity(existing ? existing.quantity : 0);
  }, [currentVariant, orders]);

  const dispatch = useAppDispatch();

  const isOutOfStock = currentVariant?.isOutOfStock;

  return (
    // Dim backdrop without blur so products behind remain crisp
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto py-8 font-sans"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={() => setClickedProduct(null)}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="bg-white w-full sm:max-w-lg rounded-[2.5rem] border-4 border-gray-900 shadow-[12px_12px_0px_#111] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-4 pb-1">
          <div className="w-12 h-1.5 bg-gray-900 rounded-full" />
        </div>

        {/* Close */}
        <div className="flex items-center justify-between px-8 pt-3 pb-4 border-b-4 border-gray-900 bg-rYellow">
          <div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{clickedProduct?.name}</h3>
            {clickedProduct?.description && (
              <p className="text-xs text-gray-800 font-bold mt-0.5">
                {clickedProduct.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setClickedProduct(null)}
            className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-rRed hover:text-white transition-all shadow-[2px_2px_0px_#111]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Variant Slider — passes product thumbnail for circle image */}
        <div className="px-8 pt-6 pb-2">
          <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 inline-block bg-rGray px-3 py-1 border border-gray-900 rounded-full">
            Choose Size
          </p>
          <VariantSlider
            data={clickedProduct?.productVariants}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
            thumbnail={clickedProduct?.thumbnail}
          />
        </div>

        {/* Quantity + CTA */}
        <div className="px-8 py-6 flex items-center justify-between gap-4 border-t-4 border-gray-900 mt-4 bg-white">
          {/* Qty controls */}
          <div className="flex items-center gap-3">
            <button 
              disabled={isOutOfStock}
              onClick={() => dispatch(removeToCart({ variant: currentVariant, quantity: 1 }))}
              className="w-10 h-10 rounded-xl border-2 border-gray-900 bg-rGray flex items-center justify-center font-black hover:bg-rYellow transition-colors shadow-[2px_2px_0px_#111]"
            >
              <Minus size={18} className="text-gray-900" />
            </button>
            <span className="text-2xl font-black text-gray-900 w-6 text-center">{quantity}</span>
            <button
              disabled={isOutOfStock}
              onClick={() => dispatch(addToCart({ variant: currentVariant, quantity: 1, product: clickedProduct }))}
              className="w-10 h-10 rounded-xl border-2 border-gray-900 bg-rRed text-white flex items-center justify-center font-black hover:bg-red-700 transition-colors shadow-[2px_2px_0px_#111]"
            >
              <Plus size={18} className="text-white" />
            </button>
          </div>

          {/* Done */}
          <button
  disabled={isOutOfStock}
  onClick={() => setClickedProduct(null)}
  className={`flex-1 py-4 font-black text-base uppercase tracking-wider rounded-2xl border-4 transition-all ${
    isOutOfStock
      ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed shadow-none"
      : "bg-gray-900 hover:bg-rRed text-rYellow hover:text-white border-gray-900 shadow-[4px_4px_0px_#C8161D]"
  }`}
>
  {isOutOfStock ? "Not Available at this moment" : quantity > 0 ? `Add ${quantity} · ₹${currentVariant?.price * quantity}` : "Done"}
</button>
        </div>
      </motion.div>
    </div>
  );
}

export default VariantModal;
