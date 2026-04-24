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
import { useGetRestaurantDetailsQuery } from "@/redux/api/restaurant";
import NotificationComponent from "./_component/Notification";

type Props = {};

function Payment({}: Props) {
  const router = useRouter();
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState();

  const { data: restaurantData, isLoading: restaurantDetailsLoader } =
    useGetRestaurantDetailsQuery(restaurantId);
  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails(restaurantData?.data);
    }
  }, [restaurantData]);
  //console.log("Restaurant Details", restaurantDetails);

  const [isPending, startTransition] = useTransition();

  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [invoiceModal, setInvoiceModal] = useState(null);

  //subscription send to backend
  const [orderId , setOrderId] = useState(null);
  

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
          amount: cartData.totalAmount,
          isPack: cartData.isPack || false,
          orders: orders,
          paymentOption: mode,
          restaurantId: restaurantId,
        };

        dispatch(resetCart());

        // //console.log(orderData);

        const response = await createOrderApi(orderData);
        //console.log("Create order response", response);

        toast.dismiss(toastId);
        if (response.success == false) {
          throw new Error("Unable to create order!");
        } else {
          toast.success("Order Created!");
          setOrderId(response?.data?.data?.id)
          setInvoiceModal(response.data.data);
        }
      }
    } catch (error: any) {
      // toast.dismiss(toastId);
      //console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-rGreen p-4 relative">
      <div>
        <button
          onClick={() =>
            startTransition(() => {
              router.push(`/${restaurantId}/menu`);
            })
          }
          className="px-5 py-2 bg-white rounded-xl font-semibold text-sm flex items-center gap-1 hover:bg-opacity-40 transition-all duration-200 "
        >
          <ArrowLeft scale={90} />
          back
        </button>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Image
          src={
            restaurantDetails?.thumbnail || process.env.NEXT_PUBLIC_DEFAULT_LOGO
          }
          alt="logo"
          width={200}
          height={200}
        />
        <div className="text-xl uppercase font-bold text-center text-white mt-20">
          Please select payment option
        </div>
        {/* <div className="flex items-center gap-8 mt-8">
          <button
          onClick={() => {
            dispatch(setPayementOption({mode: "Cash"}));
            CreateOrderHandler("Cash");
          }}
          disabled={isLoading}
          className="w-32 h-40 cursor-pointer bg-white">
            <p>Cash</p>
          </button>
          <button
          onClick={() => {
            dispatch(setPayementOption({mode: "Online"}));
            CreateOrderHandler("Online");
          }}
          disabled={isLoading}
          className="w-32 h-40 cursor-pointer bg-white">
            <p>Online</p>
          </button>
        </div> */}
        <div className="flex items-center gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 10 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="rounded-xl py-2 bg-rGray px-4 cursor-pointer hover:shadow-xl"
            onClick={() => {
              dispatch(setPayementOption({ mode: "Cash" }));
              CreateOrderHandler("Cash");
            }}
          >
            <div className="w-24 h-24 flex items-center justify-center">
              <Image
                src={"/cashPayment.png"}
                alt="cash"
                height={90}
                width={90}
              />
            </div>
            <p className="py-2 w-full text-center text-sm font-semibold uppercase">
              Pay at counter
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, width: "100vw", height: "100vh" }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            disabled={true}
            className="rounded-xl bg-rGray px-4 py-2 cursor-not-allowed hover:shadow-xl"
            onClick={() => {
              dispatch(setPayementOption({ mode: "Online" }));
              CreateOrderHandler("Online");
            }}
          >
            <div className="w-24 h-24 flex items-center justify-center">
              <Image
                src={"/onlinePayment.png"}
                alt="online"
                height={150}
                width={130}
              />
            </div>
            <p className="py-2 w-full text-center text-sm font-semibold uppercase">
              Pay online here
            </p>
          </motion.button>
        </div>
      </div>
      {orderId && <NotificationComponent orderId={orderId}/>}
      {invoiceModal && <Success data={invoiceModal} />}
    </div>
  );
}

export default Payment;
