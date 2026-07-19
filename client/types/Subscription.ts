import { PlanType, SubscriptionStatus } from '@/constants/SubscriptionConstant';

export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  trialDays: number;
  maxProducts: number;
  maxCategories: number;
  maxEmployees: number;
  maxQRCodes: number;
  orderHistory: number;
  features: string[];
}

export interface Subscription {
  id: string;
  restaurantId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEndsAt: string | null;
  plan: Plan;
}

export interface Payment {
  id: string;
  amount: number;
  status: number;
  gateway: string;
  gatewayOrderId: string;
  createdAt: string;
  metadata: any;
}

export interface GetPlansResponse {
  success: boolean;
  plans: Plan[];
}

export interface GetCurrentSubscriptionResponse {
  success: boolean;
  subscription: Subscription | null;
}

export interface CreatePaymentOrderRequest {
  planId: string;
}

export interface CreatePaymentOrderResponse {
  success: boolean;
  message?: string;
  redirectUrl?: string;
  paymentId?: string;
  transactionId?: string;
}

export interface GetPaymentHistoryResponse {
  success: boolean;
  payments: Payment[];
}
