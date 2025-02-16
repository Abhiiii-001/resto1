"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, RefreshCcw, Tag, X } from "lucide-react";
import { ProductInterface, useGetMenuQuery } from "@/redux/api/data";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import {
  addToCart,
  removeToCart,
  resetCart,
  setEatingLocation,
  SubOrderInterface,
} from "@/redux/states/cartSlice";
import Image from "next/image";

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
};

function Cart({ isCartOpen, setIsCartOpen }: Props) {
  const router = useRouter();
  const { restaurantId } = useParams();
  // console.log("Restaurnat Id from cart",restaurantId)
  
  const [isPending, startTransition] = useTransition();

  const { orders, totalAmount, totalItem, isPack } = useAppSelector(
    (state) => state.cart
  );


  const dispatch = useAppDispatch();

  const [selectedCoupon, setSelectedCoupon] = useState("");

  return (
    <motion.div className="fixed inset-0 min-w-screen z-50 backdrop-blur-lg flex">
      <div className="w-0 lg:w-[calc(100vw-750px)]"></div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        onAnimationEnd={() => setIsCartOpen(false)}
        className="bg-white shadow-xl border-r-2 border-richWhite-600 overflow-y-auto w-screen min-h-screen h-full lg:w-[750px] right-0 px-6 py-4"
      >
        {/* Heading */}
        <div className="w-[70%] lg:w-[64%] flex items-center justify-between">
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-richWhite-800 "
          >
            <ChevronLeft />
          </button>

          <div className="text-richWhite-800 text-2xl font-serif font-semibold">
            My Order
          </div>
        </div>

        {/* Eating location */}
        <div className="">
          <div className="flex items-center gap-2 font-semibold text-richWhite-700 my-6">
            <div>Eating Location : </div>
            <div className="text-blue-400 text-sm underline">
              {isPack ? "Take out" : "Eat in"}
            </div>
            <div
              onClick={() => {
                dispatch(setEatingLocation(!isPack));
              }}
              className="text-sm hover:text-richWhite-900"
            >
              <RefreshCcw size={18} />
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          {orders && orders.length == 0 ? (
            <div className="w-full h-full flex items-center justify-center mt-16 font-semibold">
              No product added
            </div>
          ) : (
            orders.map((order) => (
              <CartItem order={order} key={order.variant.id} />
            ))
          )}
        </div>

        {/* Coupon */}
        {orders.length > 0 && (
          <div className="flex flex-col w-full mt-12">
            <label
              htmlFor="coupon"
              className="text-xl font-medium flex gap-2 text-richWhite-800"
            >
              <Tag scale={90} />
              <p>Coupon</p>
            </label>
            <input
              name="coupon"
              value={selectedCoupon}
              onChange={(e) => setSelectedCoupon(e.target.value)}
              placeholder="Enter your code"
              className="px-3 py-3 mt-5 text-richWhite-800 border relative border-richWhite-600 rounded-xl shadow-lg"
            />
            <div className="w-full flex items-end justify-end mr-2 mt-2 text-sm text-blue-400 underline ">
              <div>Apply</div>
            </div>
          </div>
        )}
        {/* <button onClick={() => dispatch(resetCart())}>Reset cart</button> */}

        {/* Bill section */}
        <div className="w-full flex flex-col font-medium items-start gap-3 !text-richWhite-700 mt-12">
          <div className="w-full flex items-center justify-between">
            <div>Price</div>
            <div className="font-semibold">₹{" " + totalAmount}</div>
          </div>
          <div className="w-full flex items-center justify-between border-b border-dashed pb-2 border-richWhite-800">
            <div>Discount</div>
            <div className="font-semibold">- ₹{" " + "0"}</div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">₹{" " + totalAmount}</div>
          </div>
        </div>

        {/* Checkout */}

        <button
          onClick={() =>
            startTransition(() => {
              router.push(`/${restaurantId}/menu/payment`);
            })
          }
          className="w-full flex gap-3 items-center justify-center px-32 mx-auto py-2 rounded-lg font-semibold my-8 font-serif text-richWhite-800 bg-richYellow-400 hover:ring-richYellow-800 transition-all duration-200"
        >
          Checkout
          <ArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );
}

const CartItem = ({ order }: { order: SubOrderInterface }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full flex-row gap-6 items-center my-4 bg-rGray px-2 py-2 rounded-2xl">
      {/* Image */}
      <div className="w-24 h-24 flex items-center justify-center scale-125">
        <Image
          src={order?.product.thumbnail}
          alt="thumbnail"
          layout="intrinsic"
          width={140}
          height={140}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-1 w-full">
        <div className="text-[1rem] font-sans ">{order?.product.name}</div>
        <>
          <div className="text-xs leading-none text-richWhite-800 font-semibold">
            {order?.variant.size}
          </div>
          <div className="text-xs font-semibold text-richWhite-800 ">
            <span className="text-blue-400 font-bold mr-1">₹</span>
            {order?.variant.price}
          </div>
        </>
        <div className="flex items-center w-full justify-between">
          {/* inc && dec */}
          <div className="flex items-center gap-1">
            <div
              onClick={() =>
                dispatch(removeToCart({ variant: order?.variant, quantity: 1 }))
              }
              className="border cursor-pointer px-3 flex items-center justify-center font-bold text-sm py-[0.10rem] border-richWhite-600 rounded-lg"
            >
              -
            </div>

            <div className="mx-2 font-serif fontsb">{order?.quantity}</div>

            <div
              onClick={() =>
                dispatch(
                  addToCart({
                    variant: order?.variant,
                    quantity: 1,
                    product: order?.product,
                  })
                )
              }
              className="border cursor-pointer px-3 font-bold flex items-center justify-center text-sm py-[0.10rem] border-richYellow-400 rounded-lg bg-richYellow-300"
            >
              +
            </div>
          </div>

          {/* delete */}
          <div
            onClick={() =>
              dispatch(
                removeToCart({
                  variant: order.variant,
                  quantity: order.quantity,
                })
              )
            }
            className="text-richWhite-800 cursor-pointer"
          >
            <X />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
