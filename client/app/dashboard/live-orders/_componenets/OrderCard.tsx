import AlertModal from '@/components/common/AlertModal';
import { useUpdateOrderStatusMutation } from '@/redux/api/order';
import { formatDateTime } from '@/utils/DateFormatter';
import {
  Check,
  CopyIcon,
  EllipsisVertical,
  PackageCheck,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

function OrderCard({ data }: any) {
  const { time, day } = formatDateTime(data.createdAt);
  const [updateStatus, { isLoading, isError }] = useUpdateOrderStatusMutation();

  const [alertModal, setAlertModal] = useState<null | string>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Update stauts handler
  const UpdateStatusHandler = async (stat: string) => {
    const toastId = toast.loading('Loading...');
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
      console.log('Something wrong while upating order states', error);
      toast.error(error.message);
    }
    setAlertModal(null);
    toast.dismiss(toastId);
  };

  //  Copy order code handler
  const CopyHandler = async () => {
    await navigator.clipboard.writeText(data?.orderCode);
    setIsCopied(true);
    toast.success('Order id copied!');
    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };

  return (
    <div className="w-full rounded-xl bg-white px-6 py-4">
      {/* First - orderId,status */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3 font-sans text-xl font-semibold">
          <div>{data.orderCode}</div>
          <CopyIcon
            size={16}
            className={`cursor-pointer transition-all duration-100 hover:opacity-80 ${isCopied ? 'text-blue-400' : 'text-gray-700'}`}
            onClick={CopyHandler}
          />
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex w-[100px] items-center justify-center rounded-[8px] border px-4 py-1 text-sm font-semibold ${
              data.status == 'Ready'
                ? 'bg-green-200 text-green-500'
                : data.status == 'Pending'
                  ? 'bg-purple-200 text-purple-500'
                  : data.status == 'Cancelled'
                    ? 'bg-red-200 text-red-500'
                    : 'bg-blue-200 text-blue-500'
            }`}
          >
            {data.status}
          </div>
          <div>
            <EllipsisVertical className="cursor-pointer transition-all duration-100 hover:opacity-70" />
          </div>
        </div>
      </div>

      {/* Name , date , time */}
      <div className="mt-2">
        <div className="text-3xl font-semibold">
          {data.name ? 'data.name' : 'Anyoumous'}
        </div>
        <div className="mt-1 flex items-center gap-1 text-sm text-blue-500">
          <p>{time}</p>
          <p>|</p>
          <p>{day}</p>
        </div>
      </div>

      {/* Eating loc , payment */}
      <div className="my-2 text-[0.90rem] font-medium">
        <div>
          Eat Location:{' '}
          <span className="font-semibold text-blue-500">
            {data.isPack ? 'Take out' : 'Eat in'}
          </span>
        </div>
        <div>
          Payment Opt:{' '}
          <span className="font-semibold text-blue-500">
            {data.paymentOption}
          </span>
        </div>
      </div>

      {/* Suborders */}
      {data.orders?.length > 0 &&
        data.orders?.map((ord) => <SubOrderCard data={ord} key={ord.id} />)}

      {/* Total and btns */}
      <div className="mt-4 flex items-center justify-between py-1">
        <div className="text-xl font-semibold">
          <p>Total</p>
          <p className="text-blue-500">₹{data.amount}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAlertModal('Cancelled')}
            className="font-bold text-red-400"
          >
            <X size={30} />
          </button>
          {data.status == 'Pending' ? (
            <button
              onClick={() => setAlertModal('Ready')}
              className="font-bold text-green-400"
            >
              <Check size={30} />
            </button>
          ) : (
            <button
              onClick={() => setAlertModal('Completed')}
              className="font-bold text-blue-400"
            >
              <PackageCheck size={24} />
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
    <div className="my-1 flex w-full items-center justify-between rounded-[0.40rem] bg-gray-100 px-4 py-1">
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
