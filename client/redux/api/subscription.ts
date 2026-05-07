import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
  GetPlansResponse, 
  GetCurrentSubscriptionResponse, 
  CreatePaymentOrderRequest, 
  CreatePaymentOrderResponse,
  GetPaymentHistoryResponse 
} from "@/types/Subscription";
import { RootState } from "../redux";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Subscription", "Payments", "RestaurantDetails"],
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/plans",
    }),
    getCurrentSubscription: builder.query({
      query: () => "/current",
      providesTags: ["Subscription"],
    }),
    createPaymentOrder: builder.mutation({
      query: (data) => ({
        url: "/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/verify-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription", "Payments", "RestaurantDetails"],
    }),
    getPaymentHistory: builder.query({
      query: () => "/history",
      providesTags: ["Payments"],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/cancel",
        method: "POST",
      }),
      invalidatesTags: ["Subscription", "RestaurantDetails"],
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
} = subscriptionApi;
