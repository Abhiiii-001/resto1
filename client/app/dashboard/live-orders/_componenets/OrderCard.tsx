import AlertModal from "@/components/common/AlertModal";
import { useUpdateOrderStatusMutation } from "@/redux/api/order";
import { formatDateTime } from "@/utils/DateFormatter";
import { Check, CopyIcon, EllipsisVertical, PackageCheck, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

function OrderCard({ data }: any) {
  const { time, day } = formatDateTime(data.createdAt);
  const [updateStatus, { isLoading, isError }] = useUpdateOrderStatusMutation();

  const [alertModal, setAlertModal] = useState<null | string>(null);
  const [ isCopied , setIsCopied ] = useState(false);


  // Update stauts handler
  const UpdateStatusHandler = async (stat: string) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await updateStatus({
        id: data.id,
        data: { status: stat },
      }).unwrap();
      if (!response?.success) {
        throw new Error(response?.message);
      }
      toast.success(`Order status changed to ${stat}`);
    } catch (error) {
      console.log("Something wrong while upating order states", error);
      toast.error(error.message);
    }
    setAlertModal(null);
    toast.dismiss(toastId);
  };

//  Copy order code handler
  const CopyHandler = async() => {
    await navigator.clipboard.writeText(data?.orderCode);
    setIsCopied(true);
    toast.success("Order id copied!")
    setTimeout(() => {
        setIsCopied(false);
    },4000)
  }

  return (
    <div className="py-4 px-6 w-[510px] bg-white rounded-xl">
      {/* First - orderId,status */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3 font-sans font-semibold text-xl">
          <div>{data.orderCode}</div>
          <CopyIcon
            size={16}
            className={`hover:opacity-80 cursor-pointer transition-all duration-100 ${isCopied ? "text-blue-400" : "text-gray-700"}`}
            onClick={CopyHandler}
          />
        </div>

        <div className="flex items-center gap-2">
          <div
            className={` flex justify-center items-center text-sm font-semibold px-4 w-[100px] py-1 rounded-[8px] border
                ${
                  data.status == "Ready"
                    ? "bg-green-200 text-green-500"
                    : data.status == "Pending"
                    ? "bg-purple-200 text-purple-500"
                    : data.status == "Cancelled"
                    ? "bg-red-200 text-red-500"
                    : "bg-blue-200 text-blue-500"
                }`}
          >
            {data.status}
          </div>
          <div>
            <EllipsisVertical className="cursor-pointer hover:opacity-70 transition-all duration-100" />
          </div>
        </div>
      </div>

      {/* Name , date , time */}
      <div className="mt-2">
        <div className="text-3xl font-semibold">
          {data.name ? "data.name" : "Anyoumous"}
        </div>
        <div className="flex items-center gap-1 mt-1 text-sm  text-blue-500">
          <p>{time}</p>
          <p>|</p>
          <p>{day}</p>
        </div>
      </div>

      {/* Eating loc , payment */}
      <div className="my-2 text-[0.90rem] font-medium ">
        <div>
          Eat Location:{" "}
          <span className="text-blue-500 font-semibold">
            {data.isPack ? "Take out" : "Eat in"}
          </span>
        </div>
        <div>
          Payment Opt:{" "}
          <span className="text-blue-500 font-semibold">
            {data.paymentOption}
          </span>
        </div>
      </div>

      {/* Suborders */}
      {data.orders?.length > 0 &&
        data.orders?.map((ord) => <SubOrderCard data={ord} key={ord.id} />)}

      {/* Total and btns */}
      <div className="flex items-center justify-between mt-4 py-1">
        <div className="text-xl font-semibold">
          <p>Total</p>
          <p className="text-blue-500">₹{data.amount}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setAlertModal("Cancelled")}
            className="text-red-400 font-bold "
          >
            <X size={30} />
          </button>
          {data.status == "Pending" ? (
            <button
              onClick={() => setAlertModal("Ready")}
              className="text-green-400 font-bold"
            >
              <Check size={30} />
            </button>
          ) : (
            <button
              onClick={() => setAlertModal("Completed")}
              className="text-blue-400 font-bold"
            >
              <PackageCheck size={24}/>
            </button>
          )}
        </div>
      </div>
      {alertModal && (
        <AlertModal
          title="Are you sure?"
          desc={`Do you want to ${alertModal.toLowerCase()} the order`}
          clickHandler={() => UpdateStatusHandler(alertModal)}
          isModalOpen={alertModal}
          setIsModalOpen={setAlertModal}
        />
      )}
    </div>
  );
}

const SubOrderCard = ({ data }: any) => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-1 rounded-[0.40rem] my-1 bg-gray-100 ">
      <div className="flex items-center gap-1">
        <p>{data.quantity}</p>
        <p>x</p>
        <p>{data.name}</p>
        <p>({data.variant})</p>
      </div>
      <div>
        <p>₹{data.quantity * data.unitPrice}</p>
      </div>
    </div>
  );
};

export default OrderCard;
