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

  return (
    // Dim backdrop without blur so products behind remain crisp
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={() => setClickedProduct(null)}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close */}
        <div className="flex items-center justify-between px-6 pt-2 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-black text-gray-900">{clickedProduct?.name}</h3>
            {clickedProduct?.description && (
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {clickedProduct.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setClickedProduct(null)}
            className="w-9 h-9 rounded-full bg-rGray flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Variant Slider — passes product thumbnail for circle image */}
        <div className="px-6 pt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">
            Choose size
          </p>
          <VariantSlider
            data={clickedProduct?.productVariants}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
            thumbnail={clickedProduct?.thumbnail}
          />
        </div>

        {/* Quantity + CTA */}
        <div className="px-6 py-5 flex items-center justify-between gap-4 border-t border-gray-100 mt-4">
          {/* Qty controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(removeToCart({ variant: currentVariant, quantity: 1 }))}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Minus size={16} className="text-gray-700" />
            </button>
            <span className="text-xl font-black text-gray-900 w-6 text-center">{quantity}</span>
            <button
              onClick={() => dispatch(addToCart({ variant: currentVariant, quantity: 1, product: clickedProduct }))}
              className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-black flex items-center justify-center transition-colors"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>

          {/* Done */}
          <button
            onClick={() => setClickedProduct(null)}
            className="flex-1 py-3 bg-rRed hover:bg-red-700 text-white font-bold rounded-2xl transition-colors"
          >
            {quantity > 0 ? `Add ${quantity} to Cart · ₹${currentVariant?.price * quantity}` : "Done"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default VariantModal;
