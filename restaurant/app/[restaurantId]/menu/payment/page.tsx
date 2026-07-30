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
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import Success from "./_component/Success";
import Header from "../_component/Header";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import NotificationComponent from "./_component/Notification";
import { Banknote, CreditCard, User, Receipt } from "lucide-react";

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

  const [, startTransition] = useTransition();

  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invoiceModal, setInvoiceModal] = useState<any>(null);
  const [orderId , setOrderId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");

  const [createOrderApi, { isLoading }] = useCreateOrderMutation();

  const CreateOrderHandler = async (mode: string) => {
    try {
      if (restaurantId) {
        const toastId = toast.loading("Creating order...");

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
          toast.success("Order Created Successfully!");
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <div className="h-16 px-4 lg:px-8 w-full border-b border-gray-100 bg-white z-30 sticky top-0 shadow-sm">
        <Header />
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Cart Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Receipt size={18} className="text-primary" />
            <h2 className="text-base font-bold text-gray-900">Order Summary</h2>
          </div>

          <div className="space-y-3">
            {cartData?.orders?.map((ord: SubOrderInterface, i: number) => (
              <div key={i} className="flex justify-between items-center bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-900">{ord.product.name}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{ord.variant.size} × {ord.quantity}</p>
                </div>
                <p className="text-xs font-extrabold text-primary">₹{ord.variant.price * ord.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</p>
            <p className="text-2xl font-extrabold text-primary">₹{cartData?.totalAmount}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-primary" />
            <h2 className="text-base font-bold text-gray-900">Guest Name (Optional)</h2>
          </div>
          <div>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Alex Chen"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="mt-2 text-[11px] font-medium text-gray-400">
              Printed on digital kitchen ticket.
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
            Payment Method
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Cash at Counter */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col items-center gap-3 cursor-pointer shadow-soft hover:shadow-soft-md hover:border-primary/30 transition-all group"
              onClick={() => {
                dispatch(setPayementOption({ mode: "Cash" }));
                CreateOrderHandler("Cash");
              }}
              disabled={isLoading}
            >
              <div className="w-14 h-14 bg-orange-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <Banknote size={26} />
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors">
                Pay at Counter
              </span>
            </motion.button>

            {/* Pay Online Coming Soon */}
            <div className="relative bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-5 flex flex-col items-center gap-3 opacity-60 cursor-not-allowed">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Coming Soon
              </span>
              <div className="w-14 h-14 bg-gray-200 text-gray-500 rounded-2xl flex items-center justify-center">
                <CreditCard size={26} />
              </div>
              <span className="text-xs font-bold text-gray-500">Pay Online</span>
            </div>
          </div>
        </div>
      </div>

      {orderId && <NotificationComponent orderId={orderId} />}
      {invoiceModal && <Success data={invoiceModal} restaurantDetails={restaurantDetails} />}
    </div>
  );
}

export default Payment;
