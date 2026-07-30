"use client";
import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Minus, Plus, X, AlertCircle } from "lucide-react";
import { ProductInterface, ProductVariantsInterface } from "@/redux/api/data";
import VariantSlider from "./VariantSlider";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { addToCart, removeToCart } from "@/redux/states/cartSlice";
import Portal from "@/app/_components/Portal";
import { useParams } from "next/navigation";

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
  const dispatch = useAppDispatch();
  const { restaurantId } = useParams();

  useEffect(() => {
    const existing = orders.find((item) => item.variant.id === currentVariant?.id);
    setQuantity(existing ? existing.quantity : 0);
  }, [currentVariant, orders]);

  // Handle body scroll lock & Keyboard Escape listener
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClickedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setClickedProduct]);

  const isOutOfStock = Boolean(currentVariant?.isOutOfStock);

  return (
    <Portal>
      {/* Dimmed backdrop overlay */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto py-8 font-sans bg-black/60 backdrop-blur-xs"
        onClick={() => setClickedProduct(null)}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="variant-modal-title"
          initial={{ y: "100%", opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: "100%", opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-white w-full sm:max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden my-auto border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-1">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-3 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 id="variant-modal-title" className="text-xl font-bold text-gray-900 tracking-tight">
                  {clickedProduct?.name}
                </h3>
                {isOutOfStock && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-danger border border-red-200">
                    <AlertCircle size={12} />
                    Out of Stock
                  </span>
                )}
              </div>
              {clickedProduct?.description && (
                <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed max-w-sm">
                  {clickedProduct.description}
                </p>
              )}
            </div>
            <button
              onClick={() => setClickedProduct(null)}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-all flex-shrink-0 ml-4 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Variant Slider */}
          <div className="px-6 pt-5 pb-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Select Variant
              </p>
              {currentVariant && (
                <span className="text-sm font-bold text-primary">
                  ₹{currentVariant.price}
                </span>
              )}
            </div>
            <VariantSlider
              data={clickedProduct?.productVariants}
              currentVariant={currentVariant}
              setCurrentVariant={setCurrentVariant}
              thumbnail={clickedProduct?.thumbnail}
            />
          </div>

          {/* Quantity + CTA controls */}
          <div className="px-6 py-6 flex items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/60">
            {/* Quantity controls */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
              <button
                disabled={isOutOfStock || quantity <= 0}
                onClick={() => dispatch(removeToCart({ variant: currentVariant, quantity: 1 }))}
                aria-label="Decrement count"
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white transition-all cursor-pointer border border-gray-100"
              >
                <Minus size={16} />
              </button>
              
              <span className="text-lg font-extrabold text-gray-900 w-7 text-center select-none">
                {quantity}
              </span>

              <button
                disabled={isOutOfStock}
                onClick={() => dispatch(addToCart({ variant: currentVariant, quantity: 1, product: clickedProduct, restaurantId: restaurantId as string }))}
                aria-label="Increment count"
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-success hover:bg-success/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white transition-all cursor-pointer border border-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Action CTA button */}
            <button
              disabled={isOutOfStock}
              onClick={() => setClickedProduct(null)}
              className={`flex-1 py-4 px-6 font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center cursor-pointer ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border border-gray-300"
                  : "bg-primary hover:bg-primary/95 text-white active:scale-[0.98]"
              }`}
            >
              {isOutOfStock
                ? "Not Available at this moment"
                : quantity > 0
                ? `Add ${quantity} · ₹${currentVariant?.price * quantity}`
                : "Done"}
            </button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default VariantModal;
