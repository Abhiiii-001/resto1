"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, RefreshCcw, X } from "lucide-react";
import { ProductInterface } from "@/redux/api/data";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import {
  addToCart,
  removeToCart,
  setEatingLocation,
  SubOrderInterface,
} from "@/redux/states/cartSlice";
import Image from "next/image";

type Props = {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
};

function Cart({ setIsCartOpen }: Props) {
  const router = useRouter();
  const { restaurantId } = useParams();
  const [, startTransition] = useTransition();

  const { orders, totalAmount, isPack } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  return (
    // Fixed overlay — no backdrop-blur so content behind is not blurred
    <motion.div
      className="fixed inset-0 z-50 flex"
      // dim backdrop without blur
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      {/* Spacer — click here closes cart */}
      <div className="flex-1" />

      {/* Cart panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="bg-white shadow-2xl w-full max-w-md h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-900">My Order</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span
              onClick={() => dispatch(setEatingLocation(!isPack))}
              className="flex items-center gap-1.5 cursor-pointer hover:text-rRed transition-colors"
              title="Switch eating location"
            >
              {isPack ? "Take Out" : "Eat In"}
              <RefreshCcw size={14} />
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 py-20 text-center">
              <span className="text-5xl">🛒</span>
              <p className="font-bold text-gray-900">Your cart is empty</p>
              <p className="text-sm text-gray-500 font-medium">Add some items to get started</p>
            </div>
          ) : (
            orders.map((order) => (
              <CartItem order={order} key={order.variant.id} />
            ))
          )}
        </div>

        {/* Bill + Checkout */}
        {orders.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 flex-shrink-0 space-y-4 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Discount</span>
                <span className="text-rGreen">– ₹0</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() =>
                startTransition(() => {
                  setIsCartOpen(false);
                  router.push(`/${restaurantId as string}/menu/payment`);
                })
              }
              className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-colors shadow-md"
            >
              Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const CartItem = ({ order }: { order: SubOrderInterface }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3 items-center bg-rGray rounded-2xl p-3">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 flex items-center justify-center border border-gray-100">
        <Image
          src={order?.product.thumbnail || "/burger.webp"}
          alt={order?.product.name}
          width={56}
          height={56}
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate">{order?.product.name}</p>
        <p className="text-xs text-gray-500 font-medium">{order?.variant.size}</p>
        <p className="text-sm font-bold text-rRed mt-0.5">₹{order?.variant.price}</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: 1 }))}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <span className="text-sm font-bold w-4 text-center">{order.quantity}</span>
        <button
          onClick={() => dispatch(addToCart({ variant: order.variant, quantity: 1, product: order.product as ProductInterface }))}
          className="w-7 h-7 rounded-lg bg-rRed flex items-center justify-center font-bold text-sm text-white hover:bg-red-700 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: order.quantity }))}
          className="w-7 h-7 rounded-lg text-gray-400 hover:text-rRed hover:bg-red-50 flex items-center justify-center transition-colors ml-1"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
