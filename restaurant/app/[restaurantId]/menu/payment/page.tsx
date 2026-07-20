"use client";
import {
  CreateOrderInterface,
  CreateSubOrderInterface,
  useCreateOrderMutation,
} from "@/redux/api/order";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import {
  resetCart,
  setPayementOption,
  SubOrderInterface,
} from "@/redux/states/cartSlice";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import Success from "./_component/Success";
import Header from "../_component/Header";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import NotificationComponent from "./_component/Notification";

function Payment() {
  const router = useRouter();
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsInterface | undefined>();

  const { data: restaurantData } =
    useGetRestaurantDetailsQuery(restaurantId as string);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);
  //console.log("Restaurant Details", restaurantDetails);

  const [, startTransition] = useTransition();

  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invoiceModal, setInvoiceModal] = useState<any>(null);

  //subscription send to backend
  const [orderId , setOrderId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");

  const [createOrderApi, { isLoading }] = useCreateOrderMutation();

  const CreateOrderHandler = async (mode: string) => {
    //prepare data
    try {
      if (restaurantId) {
        const toastId = toast.loading("Loading..");

        const orders: CreateSubOrderInterface[] = [];
        cartData?.orders.forEach((ord: SubOrderInterface) => {
          orders.push({
            name: ord.product.name,
            variant: ord.variant.size,
            productVariantId: ord.variant.id,
            quantity: ord.quantity,
            unitPrice: ord.variant.price,
          });
        });

        const orderData: CreateOrderInterface = {
          name: customerName,
          amount: cartData.totalAmount,
          isPack: cartData.isPack || false,
          orders: orders,
          paymentOption: mode,
          restaurantId: restaurantId as string,
        };

        const response = await createOrderApi(orderData);

        toast.dismiss(toastId);
        if ("error" in response) {
          throw new Error("Unable to create order!");
        } else {
          dispatch(resetCart());
          toast.success("Order Created!");
          setOrderId(response?.data?.data?.id);
          setInvoiceModal(response.data.data);
        }
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-rGray flex flex-col font-sans selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <div className="h-20 px-4 lg:px-8 w-full border-b-4 border-gray-900 bg-white z-30 sticky top-0">
        <Header />
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col gap-8">
        {/* Cart Summary */}
        <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_#111] p-8">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6 pb-2 border-b-2 border-gray-900">Order Summary</h2>
          <div className="space-y-4">
            {cartData?.orders?.map((ord: SubOrderInterface, i: number) => (
              <div key={i} className="flex justify-between items-center bg-rGray p-3.5 rounded-xl border-2 border-gray-900 shadow-[2px_2px_0px_#111]">
                <div>
                  <p className="text-base font-black text-gray-900 uppercase tracking-tight">{ord.product.name}</p>
                  <p className="text-xs text-gray-700 font-bold uppercase">{ord.variant.size} × {ord.quantity}</p>
                </div>
                <p className="text-base font-black text-rRed">₹{ord.variant.price * ord.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t-4 border-gray-900 flex justify-between items-center">
            <p className="text-base font-black text-gray-900 uppercase tracking-wider">Total Amount</p>
            <p className="text-3xl font-black text-gray-900 bg-rYellow px-3 py-1 border-2 border-gray-900 shadow-[3px_3px_0px_#111]">₹{cartData?.totalAmount}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_#111] p-8">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">Customer Details (Optional)</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-xs font-black text-gray-900 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full px-5 py-4 bg-rGray border-4 border-gray-900 rounded-2xl text-base font-bold focus:outline-none focus:bg-white shadow-[4px_4px_0px_#111] transition-all"
              />
              <p className="mt-2 text-xs font-bold text-gray-600 italic">
                * Displayed on your digital kitchen ticket.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div>
          <p className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 px-1">
            Select Payment Method
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* Cash */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -4, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="bg-rYellow border-4 border-gray-900 rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-pointer shadow-[8px_8px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all group"
              onClick={() => {
                dispatch(setPayementOption({ mode: "Cash" }));
                CreateOrderHandler("Cash");
              }}
              disabled={isLoading}
            >
              <div className="w-20 h-20 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111] group-hover:rotate-6 transition-transform">
                <Image src="/cashPayment.png" alt="cash" height={60} width={60} />
              </div>
              <span className="text-base font-black text-gray-900 uppercase tracking-tighter">
                Pay at Counter
              </span>
            </motion.button>

            {/* Online — disabled with Coming Soon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative bg-gray-200 border-4 border-dashed border-gray-900 rounded-[2rem] p-6 flex flex-col items-center gap-4 cursor-not-allowed opacity-60"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-rYellow text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 border-gray-900 whitespace-nowrap">
                Coming Soon
              </span>
              <div className="w-20 h-20 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center opacity-70">
                <Image src="/onlinePayment.png" alt="online" height={60} width={60} />
              </div>
              <span className="text-base font-black text-gray-700 uppercase tracking-tighter">Pay Online</span>
            </motion.div>
          </div>
        </div>
      </div>

      {orderId && <NotificationComponent orderId={orderId} />}
      {invoiceModal && <Success data={invoiceModal} restaurantDetails={restaurantDetails} />}
    </div>
  );
}

export default Payment;

