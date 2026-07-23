import { useAppDispatch } from '@/redux/redux';
import { closeModal } from '@/redux/states/modalSlice';
import { useCreatePaymentOrderMutation } from '@/redux/api/subscription';
import { AlertCircle, Loader2, Info, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface PlanChangeModalProps {
  data: {
    planId: string;
    preview: {
      currentUsage: { products: number; categories: number; employees: number };
      newLimits: { products: number; categories: number; employees: number };
      willDeactivate: { products: number; categories: number; employees: number };
    };
  };
}

export default function PlanChangeModal({ data }: PlanChangeModalProps) {
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreatePaymentOrderMutation();
  const { planId, preview } = data;
  const { willDeactivate, newLimits } = preview;

  const isDowngrade = willDeactivate.products > 0 || willDeactivate.categories > 0 || willDeactivate.employees > 0;

  const handleConfirm = async () => {
    try {
      const res = await createOrder({ planId }).unwrap();
      if (res.success && res.redirectUrl) {
        window.location.href = res.redirectUrl;
      } else {
        dispatch(closeModal());
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to initiate payment');
      dispatch(closeModal());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="bg-white rounded-2xl shadow-xl w-full"
    >
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDowngrade ? 'bg-red-100' : 'bg-primary/10'}`}>
          {isDowngrade ? <AlertCircle className="w-6 h-6 text-red-600" /> : <ArrowRight className="w-6 h-6 text-primary" />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{isDowngrade ? 'Plan Downgrade Warning' : 'Confirm Plan Change'}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isDowngrade ? 'Some of your active items will be deactivated' : 'You are about to change your subscription plan'}
          </p>
        </div>
      </div>

      <div className="p-6">
        {isDowngrade ? (
          <>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              The plan you selected has lower limits than your current usage. 
              To prevent data loss, we won't delete your items. Instead, the <strong>most recently added</strong> excess items will be temporarily deactivated. 
              You can re-enable them later if you upgrade again.
            </p>

            <div className="space-y-4 mb-6">
              {willDeactivate.products > 0 && (
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="font-medium text-red-800">Products</span>
                  <span className="text-sm text-red-600 font-semibold">{willDeactivate.products} will be deactivated (Limit: {newLimits.products})</span>
                </div>
              )}
              {willDeactivate.categories > 0 && (
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="font-medium text-red-800">Categories</span>
                  <span className="text-sm text-red-600 font-semibold">{willDeactivate.categories} will be deactivated (Limit: {newLimits.categories})</span>
                </div>
              )}
              {willDeactivate.employees > 0 && (
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="font-medium text-red-800">Employees</span>
                  <span className="text-sm text-red-600 font-semibold">{willDeactivate.employees} will be deactivated (Limit: {newLimits.employees})</span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Note: Deactivated employees will not be able to log in. Deactivated products and categories will be hidden from your customers.
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed text-center py-4">
            Are you sure you want to proceed to payment and activate your new plan?
          </p>
        )}
      </div>

      <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3 border-t border-gray-100">
        <button
          onClick={() => dispatch(closeModal())}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 ${isDowngrade ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            isDowngrade ? 'I Understand, Proceed' : 'Proceed to Payment'
          )}
        </button>
      </div>
    </motion.div>
  );
}
