"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, RefreshCcw, X, ShoppingBag, Utensils } from "lucide-react";
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
import Portal from "@/app/_components/Portal";

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
    <Portal>
      <motion.div
        className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs font-sans"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsCartOpen(false);
        }}
      >
        <div className="flex-1" />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white w-full max-w-md h-full flex flex-col overflow-hidden shadow-2xl border-l border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Your Order</h2>
            </div>

            <button
              onClick={() => dispatch(setEatingLocation(!isPack))}
              className="flex items-center gap-1.5 cursor-pointer bg-orange-50 text-primary border border-orange-200 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:bg-primary hover:text-white"
              title="Switch order type"
            >
              {isPack ? <ShoppingBag size={13} /> : <Utensils size={13} />}
              {isPack ? "Takeaway" : "Dine-In"}
              <RefreshCcw size={12} className="ml-0.5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 bg-gray-50/50">
            {orders.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 py-20 text-center">
                <span className="text-5xl opacity-40">🛒</span>
                <p className="font-bold text-lg text-gray-900">Your order is empty</p>
                <p className="text-xs text-gray-500 font-medium max-w-xs">
                  Browse the menu and add items to your cart.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <CartItem order={order} key={order.variant.id} />
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {orders.length > 0 && (
            <div className="px-6 py-5 border-t border-gray-100 flex-shrink-0 space-y-4 bg-white shadow-soft">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Taxes & Charges</span>
                  <span className="text-success font-bold">Included</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Payable</span>
                  <span className="text-primary font-extrabold text-lg">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  startTransition(() => {
                    setIsCartOpen(false);
                    router.push(`/${restaurantId as string}/menu/payment`);
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/95 text-white font-bold text-sm rounded-2xl shadow-md shadow-primary/25 transition-all cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Portal>
  );
}

const CartItem = ({ order }: { order: SubOrderInterface }) => {
  const dispatch = useAppDispatch();
  const { restaurantId } = useParams();

  return (
    <div className="flex gap-3 items-center bg-white rounded-2xl p-3.5 border border-gray-100 shadow-soft">
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 relative border border-gray-100">
        <Image
          src={order?.product.thumbnail || "/burger.webp"}
          alt={order?.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-900 truncate leading-snug">{order?.product.name}</p>
        <p className="text-[11px] text-gray-400 font-medium">{order?.variant.size}</p>
        <p className="text-xs font-bold text-primary mt-0.5">₹{order?.variant.price}</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: 1 }))}
          className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer text-gray-700"
        >
          −
        </button>

        <span className="text-xs font-bold w-4 text-center text-gray-900 select-none">
          {order.quantity}
        </span>

        <button
          onClick={() => dispatch(addToCart({ variant: order.variant, quantity: 1, product: order.product as ProductInterface, restaurantId: restaurantId as string }))}
          className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer text-success"
        >
          +
        </button>

        <button
          onClick={() => dispatch(removeToCart({ variant: order.variant, quantity: order.quantity }))}
          className="w-7 h-7 rounded-lg text-gray-400 hover:text-danger hover:bg-red-50 flex items-center justify-center transition-colors ml-1 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
