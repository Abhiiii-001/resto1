'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/redux';
import { openModal } from '@/redux/states/modalSlice';
import {
  CreditCard,
  Zap,
  Shield,
  Crown,
  Check,
  ArrowUpRight,
  Loader2,
  Sparkles,
  AlertCircle,
  History,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetPlansQuery,
  useGetCurrentSubscriptionQuery,
  useGetPaymentHistoryQuery,
  useCreatePaymentOrderMutation,
  usePreviewSubscriptionChangeMutation,
} from '@/redux/api/subscription';
import { skipToken } from '@reduxjs/toolkit/query';
import { notFound } from 'next/navigation';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
import Loader from '@/components/common/Loader';
import AlertModal from '@/components/common/AlertModal';
import { PLAN_TYPE } from '@/constants/SubscriptionConstant';

// --- Plan Overview Component ---
const PlanOverview = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isRestaurant = user?.role === 'Restaurant';

  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery(
    isRestaurant ? {} : skipToken
  );
  const { data: subData, isLoading: subLoading } =
    useGetCurrentSubscriptionQuery(isRestaurant ? {} : skipToken);
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreatePaymentOrderMutation();
  const [previewChange, { isLoading: isPreviewing }] =
    usePreviewSubscriptionChangeMutation();
  const dispatch = useAppDispatch();

  const [alertModal, setAlertModal] = useState<boolean | string>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [checkingPlanId, setCheckingPlanId] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setCheckingPlanId(planId);
    try {
      const previewRes = await previewChange({ planId }).unwrap();
      if (previewRes.success) {
        const { willDeactivate } = previewRes.data;

        if (
          willDeactivate.products > 0 ||
          willDeactivate.categories > 0 ||
          willDeactivate.employees > 0
        ) {
          dispatch(
            openModal({
              type: 'PLAN_CHANGE_CONFIRMATION',
              data: {
                planId,
                preview: previewRes.data,
              },
            })
          );
          return;
        }

        setSelectedPlanId(planId);
        setAlertModal(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to initiate plan change');
    } finally {
      setCheckingPlanId(null);
    }
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlanId) return;
    try {
      const res = await createOrder({ planId: selectedPlanId }).unwrap();
      if (res.success && res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to initiate plan change');
    }
  };

  if (plansLoading || subLoading) {
    return null;
  }

  const currentSub = subData?.subscription;
  const plans = plansData?.plans || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Current Plan Status Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-sm transition-all hover:shadow-md">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Your Subscription
              </p>
              <h2 className="text-3xl font-black text-foreground">
                {currentSub?.plan?.name || 'Demo Period'}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                {currentSub && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Renewal:{' '}
                      <span className="text-foreground font-semibold">
                        {new Date(
                          currentSub.currentPeriodEnd,
                        ).toLocaleDateString()}
                      </span>
                    </p>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span
                      className={cn(
                        'text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tighter',
                        currentSub.status === 1
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      )}
                    >
                      {currentSub.status === 1 ? 'Active' : 'Expired'}
                    </span>
                  </>
                )}
                {!currentSub && (
                  <p className="text-sm text-amber-600 font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> No active subscription
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Options Header */}
      <div className="text-center space-y-2 py-4">
        <h3 className="text-2xl font-black text-foreground tracking-tight">
          Flexible Plans for Every Stage
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scale your restaurant operations with the right set of tools and
          features.
        </p>
      </div>

      {/* Upgrade Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan: any) => {
          const isPro = plan.type === PLAN_TYPE.PRO;
          const isCurrent = currentSub?.planId === plan.id;

          const isAnyLoading = isCreatingOrder || isPreviewing || checkingPlanId !== null;
          const isThisPlanChecking = checkingPlanId === plan.id;
          const isThisPlanOrdering = isCreatingOrder && selectedPlanId === plan.id;
          const isThisPlanLoading = isThisPlanChecking || isThisPlanOrdering;

          return (
            <div
              key={plan.id}
              className={cn(
                'relative p-8 rounded-3xl bg-white border transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between',
                isPro
                  ? 'border-primary/30 shadow-xl shadow-primary/5'
                  : 'border-border shadow-sm',
              )}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-6 flex justify-between items-start">
                  <div
                    className={cn(
                      'p-3 rounded-2xl',
                      plan.type === PLAN_TYPE.DEMO
                        ? 'bg-blue-50'
                        : plan.type === PLAN_TYPE.PRO
                          ? 'bg-primary/10'
                          : 'bg-amber-50',
                    )}
                  >
                    {plan.type === PLAN_TYPE.DEMO && <Zap className="w-8 h-8 text-blue-600" />}
                    {plan.type === PLAN_TYPE.PRO && (
                      <Shield className="w-8 h-8 text-primary" />
                    )}
                    {plan.type === PLAN_TYPE.PREMIUM && (
                      <Crown className="w-8 h-8 text-amber-600" />
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.type === PLAN_TYPE.DEMO
                    ? 'Perfect for trying out our features'
                    : plan.type === PLAN_TYPE.PRO
                      ? 'Ideal for growing restaurants'
                      : 'Unleash the full power of your business'}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-foreground">
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground font-medium text-sm">
                    / month
                  </span>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start gap-3 text-foreground/80 font-medium text-sm">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>
                      {plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts}{' '}
                      Products
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-foreground/80 font-medium text-sm">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>
                      {plan.maxCategories === -1
                        ? 'Unlimited'
                        : plan.maxCategories}{' '}
                      Categories
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-foreground/80 font-medium text-sm">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>
                      {plan.maxEmployees === -1
                        ? 'Unlimited Staff'
                        : `${plan.maxEmployees} Employees`}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-foreground/80 font-medium text-sm">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>
                      {plan.orderHistory === -1
                        ? 'Full'
                        : `${plan.orderHistory} Days`}{' '}
                      Order History
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={isAnyLoading || isCurrent || plan.type == PLAN_TYPE.DEMO}
                onClick={() => handleUpgrade(plan.id)}
                className={cn(
                  'w-full py-4 rounded-xl font-black transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                  isCurrent
                    ? 'bg-muted text-muted-foreground'
                    : isPro
                      ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30'
                      : 'bg-foreground text-background hover:bg-foreground/90',
                )}
              >
                {isThisPlanLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-current" />
                    <span>{isThisPlanChecking ? 'Checking...' : 'Connecting...'}</span>
                  </>
                ) : isCurrent ? (
                  'Active Plan'
                ) : (
                  'Choose Plan'
                )}
              </button>
            </div>
          );
        })}
      </div>

      <AlertModal
        title="Confirm Plan Change"
        desc="Are you sure you want to proceed to payment and activate this new plan?"
        isModalOpen={alertModal}
        setIsModalOpen={setAlertModal}
        clickHandler={handleConfirmUpgrade}
      />
    </motion.div>
  );
};

// --- Transaction History Component ---
const TransactionHistory = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isRestaurant = user?.role === 'Restaurant';
  const { data: historyData, isLoading } = useGetPaymentHistoryQuery(
    isRestaurant ? {} : skipToken
  );

  if (isLoading) {
    return null;
  }

  const payments = historyData?.payments || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              {['Transaction ID', 'Date', 'Amount', 'Status'].map((h) => (
                <th
                  key={h}
                  className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-8 py-16 text-center text-muted-foreground font-medium"
                >
                  <div className="flex flex-col items-center gap-3">
                    <History className="w-12 h-12 opacity-10" />
                    <p>No transactions recorded yet.</p>
                  </div>
                </td>
              </tr>
            ) : (
              payments.map((pay: any) => (
                <tr key={pay.id} className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-5">
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {pay.gatewayOrderId}
                    </code>
                  </td>
                  <td className="px-8 py-5 text-foreground/80 text-sm font-medium">
                    {new Date(pay.createdAt).toLocaleDateString(undefined, {
                      dateStyle: 'medium',
                    })}
                  </td>
                  <td className="px-8 py-5 text-foreground font-bold">
                    ₹{pay.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          pay.status === 2
                            ? 'bg-green-500'
                            : pay.status === 1
                              ? 'bg-amber-500'
                              : 'bg-red-500',
                        )}
                      />
                      <span
                        className={cn(
                          'text-[10px] font-black uppercase tracking-wider',
                          pay.status === 2
                            ? 'text-green-600'
                            : pay.status === 1
                              ? 'text-amber-600'
                              : 'text-red-600',
                        )}
                      >
                        {pay.status === 2
                          ? 'Captured'
                          : pay.status === 1
                            ? 'Pending'
                            : 'Failed'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'history'>('plan');
  const user = useAppSelector((state) => state.auth.user);
  const isRestaurant = user?.role === 'Restaurant';

  const currentTab = isRestaurant ? activeTab : 'history';

  const { isLoading: plansLoading } = useGetPlansQuery(isRestaurant ? {} : skipToken);
  const { isLoading: subLoading } = useGetCurrentSubscriptionQuery(isRestaurant ? {} : skipToken);
  const { isLoading: historyLoading } = useGetPaymentHistoryQuery(isRestaurant ? {} : skipToken);

  if (user && !isRestaurant) {
    notFound();
  }

  const isPageLoading =
    (currentTab === 'plan' && (plansLoading || subLoading)) ||
    (currentTab === 'history' && historyLoading);

  if (isPageLoading) return <Loader />;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-1">
        <div className="flex w-full flex-col items-start md:flex-row gap-8 md:gap-4 md:items-center md:justify-between py-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Subscription
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Link
                href={'/'}
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <span>&gt;</span>
              <Link
                href={'/dashboard'}
                className="transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <span>&gt;</span>
              <span className="text-foreground">Subscription</span>
            </div>
          </div>

          {/* Tab Control */}
          <div className="flex p-1 bg-white border border-border rounded-xl shadow-sm self-start">
            {isRestaurant && (
              <button
                onClick={() => setActiveTab('plan')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200',
                  activeTab === 'plan'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Plans
              </button>
            )}
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200',
                currentTab === 'history'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              History
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {currentTab === 'plan' ? <PlanOverview /> : <TransactionHistory />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
