import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
import {
  GetPlansResponse,
  GetCurrentSubscriptionResponse,
  CreatePaymentOrderRequest,
  CreatePaymentOrderResponse,
  GetPaymentHistoryResponse,
} from '@/types/Subscription';

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: baseQueryWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription`),
  tagTypes: ['Subscription', 'Payments', 'RestaurantDetails'],
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => '/plans',
    }),
    getCurrentSubscription: builder.query({
      query: () => '/current',
      providesTags: ['Subscription'],
    }),
    createPaymentOrder: builder.mutation({
      query: (data) => ({
        url: '/create-order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payments'],
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: '/verify-payment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscription', 'Payments', 'RestaurantDetails'],
    }),
    getPaymentHistory: builder.query({
      query: () => '/history',
      providesTags: ['Payments'],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: '/cancel',
        method: 'POST',
      }),
      invalidatesTags: ['Subscription', 'RestaurantDetails'],
    }),
    previewSubscriptionChange: builder.mutation({
      query: (data) => ({
        url: '/preview-change',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetCurrentSubscriptionQuery,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useGetPaymentHistoryQuery,
  useCancelSubscriptionMutation,
  usePreviewSubscriptionChangeMutation,
} = subscriptionApi;
