"use client";
import {
  CreateOrderInterface,
  CreateSubOrderInterface,
  useCreateOrderMutation,
  useSubscribeMutation,
} from "@/redux/api/order";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import {
  resetCart,
  setPayementOption,
  SubOrderInterface,
} from "@/redux/states/cartSlice";
import { requestNotificationPermission } from "@/utils/webPushConfiguration";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import Success from "./_component/Success";
import { RestaurantDetailsInterface, useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import NotificationComponent from "./_component/Notification";

type Props = {};

function Payment({}: Props) {
  const router = useRouter();
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsInterface | undefined>();

  const { data: restaurantData, isLoading: restaurantDetailsLoader } =
    useGetRestaurantDetailsQuery(restaurantId as string);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);
  //console.log("Restaurant Details", restaurantDetails);

  const [isPending, startTransition] = useTransition();

  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

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

        let orders: CreateSubOrderInterface[] = [];
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

        dispatch(resetCart());

        // //console.log(orderData);

        const response = await createOrderApi(orderData);

        toast.dismiss(toastId);
        if ("error" in response) {
          throw new Error("Unable to create order!");
        } else {
          toast.success("Order Created!");
          setOrderId(response?.data?.data?.id);
          setInvoiceModal(response.data.data);
        }
      }
    } catch (error: any) {
      // toast.dismiss(toastId);
      //console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-rGray flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() =>
            startTransition(() => {
              router.push(`/${restaurantId}/menu`);
            })
          }
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartData?.orders?.map((ord: SubOrderInterface, i: number) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{ord.product.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{ord.variant.size} × {ord.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">₹{ord.variant.price * ord.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-600">Total Amount</p>
            <p className="text-xl font-black text-rRed">₹{cartData?.totalAmount}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Customer Details (Optional)</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                Your Name
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rRed/20 focus:border-rRed transition-all"
              />
              <p className="mt-2 text-[10px] text-gray-400 px-1 italic">
                * This will be displayed on your digital order ticket.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">
            Select Payment Method
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Cash */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white border-2 border-gray-100 hover:border-rRed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition-all group"
              onClick={() => {
                dispatch(setPayementOption({ mode: "Cash" }));
                CreateOrderHandler("Cash");
              }}
              disabled={isLoading}
            >
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Image src="/cashPayment.png" alt="cash" height={60} width={60} />
              </div>
              <span className="text-sm font-bold text-gray-800 group-hover:text-rRed transition-colors">
                Pay at Counter
              </span>
            </motion.button>

            {/* Online — disabled with Coming Soon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-not-allowed opacity-60"
            >
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                Coming Soon
              </span>
              <div className="w-16 h-16 flex items-center justify-center">
                <Image src="/onlinePayment.png" alt="online" height={60} width={60} />
              </div>
              <span className="text-sm font-bold text-gray-500">Pay Online</span>
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

