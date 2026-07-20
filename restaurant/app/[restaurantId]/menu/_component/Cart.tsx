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
        className="bg-white border-l-4 border-gray-900 shadow-2xl w-full max-w-md h-full flex flex-col overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-gray-900 flex-shrink-0 bg-rYellow">
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-rRed hover:text-white transition-all shadow-[2px_2px_0px_#111]"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">My Order</h2>
          <div className="flex items-center gap-2 text-sm text-gray-900 font-black">
            <span
              onClick={() => dispatch(setEatingLocation(!isPack))}
              className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_#111] uppercase text-xs"
              title="Switch eating location"
            >
              {isPack ? "Take Out" : "Eat In"}
              <RefreshCcw size={14} />
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-rGray">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 py-20 text-center">
              <span className="text-6xl">🛒</span>
              <p className="font-black text-2xl uppercase tracking-tighter text-gray-900">Your cart is empty</p>
              <p className="text-sm text-gray-700 font-bold">Add some food to get started!</p>
            </div>
          ) : (
            orders.map((order) => (
              <CartItem order={order} key={order.variant.id} />
            ))
          )}
        </div>

        {/* Bill + Checkout */}
        {orders.length > 0 && (
          <div className="px-6 py-6 border-t-4 border-gray-900 flex-shrink-0 space-y-5 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-base font-bold text-gray-700">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-700">
                <span>Discount</span>
                <span className="text-rGreen font-black">– ₹0</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-3 border-t-2 border-gray-900 uppercase tracking-tight">
                <span>Total</span>
                <span className="bg-rYellow px-2 border border-gray-900">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() =>
                startTransition(() => {
                  setIsCartOpen(false);
                  router.push(`/${restaurantId as string}/menu/payment`);
                })
              }
              className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 hover:bg-rRed text-rYellow hover:text-white font-black text-lg uppercase tracking-wider rounded-2xl border-4 border-gray-900 shadow-[6px_6px_0px_#C8161D] transition-all transform hover:scale-[1.01]"
            >
              Checkout
              <ArrowRight size={20} />
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
    <div className="flex gap-4 items-center bg-white rounded-2xl p-4 border-4 border-gray-900 shadow-[4px_4px_0px_#111]">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-rYellow flex-shrink-0 flex items-center justify-center border-2 border-gray-900">
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
        <p className="text-base font-black text-gray-900 truncate uppercase tracking-tight">{order?.product.name}</p>
        <p className="text-xs text-gray-700 font-bold uppercase">{order?.variant.size}</p>
        <p className="text-sm font-black text-rRed mt-0.5">₹{order?.variant.price}</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: 1 }))}
          className="w-8 h-8 rounded-xl border-2 border-gray-900 bg-rGray flex items-center justify-center font-black text-base hover:bg-rYellow transition-colors shadow-[2px_2px_0px_#111]"
        >
          −
        </button>
        <span className="text-base font-black w-4 text-center">{order.quantity}</span>
        <button
          onClick={() => dispatch(addToCart({ variant: order.variant, quantity: 1, product: order.product as ProductInterface }))}
          className="w-8 h-8 rounded-xl border-2 border-gray-900 bg-rRed text-white flex items-center justify-center font-black text-base hover:bg-red-700 transition-colors shadow-[2px_2px_0px_#111]"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: order.quantity }))}
          className="w-8 h-8 rounded-xl border-2 border-gray-900 text-gray-900 hover:text-white hover:bg-rRed flex items-center justify-center transition-colors ml-1 shadow-[2px_2px_0px_#111]"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
