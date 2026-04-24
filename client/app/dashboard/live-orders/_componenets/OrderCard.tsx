import AlertModal from '@/components/common/AlertModal';
import { useUpdateOrderStatusMutation } from '@/redux/api/order';
import { formatDateTime } from '@/utils/DateFormatter';
import {
  Check,
  CopyIcon,
  EllipsisVertical,
  PackageCheck,
  X,
  Clock,
  UtensilsCrossed,
  ShoppingBag
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';

type Props = {
  data: Order
};

function OrderCard({ data }: Props) {
  const { time, day } = formatDateTime(data.createdAt);
  const [updateStatus, { isLoading, isError }] = useUpdateOrderStatusMutation();

  const [alertModal, setAlertModal] = useState<null | string>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Update stauts handler
  const UpdateStatusHandler = async (status: string) => {
    const toastId = toast.loading('Updating...');
    try {
      const response = await updateStatus({
        id: data.id,
        data: { status: status },
      }).unwrap();
      if (!response?.success) {
        throw new Error(response?.message);
      }
      toast.success(`Order status changed to ${status}`);
    } catch (error: any) {
      toast.error(error.message);
    }
    setAlertModal(null);
    toast.dismiss(toastId);
  };

  //  Copy order code handler
  const CopyHandler = async () => {
    await navigator.clipboard.writeText(data?.orderCode);
    setIsCopied(true);
    toast.success('Order ID copied!');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header - Order ID and Status */}
      <div className="flex w-full items-start justify-between border-b border-gray-100 p-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              #{data.orderCode}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-6 w-6 rounded-md ${isCopied ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={CopyHandler}
              title="Copy Order ID"
            >
              {isCopied ? <Check size={14} /> : <CopyIcon size={14} />}
            </Button>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{time} &middot; {day}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ${
              data.status == 'Ready'
                ? 'bg-green-50 text-green-700 ring-green-600/20'
                : data.status == 'Pending'
                  ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
                  : data.status == 'Cancelled'
                    ? 'bg-red-50 text-red-700 ring-red-600/20'
                    : 'bg-primary/10 text-primary ring-primary/20'
            }`}
          >
            {data.status}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <EllipsisVertical size={16} />
          </Button>
        </div>
      </div>

      {/* Customer Info & Order Details */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {data.name ? data.name : 'Anonymous Customer'}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
              data.isPack ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
            }`}>
              {data.isPack ? <ShoppingBag size={12}/> : <UtensilsCrossed size={12}/>}
              {data.isPack ? 'Take Out' : 'Eat In'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
              Payment: {data.paymentOption}
            </span>
          </div>
        </div>

        {/* Suborders */}
        <div className="flex flex-col gap-2 mt-2">
          {data.orders?.length > 0 ? (
            data.orders?.map((ord: any) => <SubOrderCard data={ord} key={ord.id} />)
          ) : (
            <div className="text-sm text-muted-foreground italic">No items found</div>
          )}
        </div>
      </div>

      {/* Footer - Total and Actions */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 bg-gray-50/50 p-5 rounded-b-xl">
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Amount</span>
          <span className="text-xl font-bold text-primary">₹{data.amount}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setAlertModal('Cancelled')}
            title="Cancel Order"
            disabled={isLoading}
          >
            <X size={18} />
          </Button>
          
          {data.status == 'Pending' ? (
            <Button
              variant="default"
              className="h-10 gap-2 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setAlertModal('Ready')}
              disabled={isLoading}
            >
              <Check size={18} />
              Mark Ready
            </Button>
          ) : (
            <Button
              variant="default"
              className="h-10 gap-2"
              onClick={() => setAlertModal('Completed')}
              disabled={isLoading}
            >
              <PackageCheck size={18} />
              Complete
            </Button>
          )}
        </div>
      </div>

      {alertModal && (
        <AlertModal
          title={`Mark as ${alertModal}?`}
          desc={`Are you sure you want to change this order's status to ${alertModal}?`}
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
    <div className="flex w-full items-start justify-between rounded-lg border border-dashed border-gray-200 p-2.5 transition-colors hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
          {data.quantity}x
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 leading-tight">{data.name}</span>
          <span className="text-xs text-muted-foreground mt-0.5">{data.variant}</span>
        </div>
      </div>
      <div className="font-semibold text-gray-700">
        ₹{data.quantity * data.unitPrice}
      </div>
    </div>
  );
};

export default OrderCard;
