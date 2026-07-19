import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addOrdersBulk } from '../states/orderSlice';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
import { CreateOrderPayload, Order, UpdateOrderPayload } from '@/types/order';
import { API_URLS } from '@/constants/Urls';

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.order,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'orderApi',
  tagTypes: ['getOrders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<ApiResponse<Order[]>, string>({
      query: (restaurantId) => ({ url: `/${restaurantId}` }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data?.success) {
            throw new Error(data?.message);
          }
          const order = data?.data || [];
          const filteredOrder = order.filter(
            (ord) => ord.status == 'Pending' || ord.status == 'Ready',
          );
          dispatch(addOrdersBulk(filteredOrder));
        } catch (_) {}
      },
      providesTags: ['getOrders'],
    }),
    createOrder: builder.mutation<ApiResponse<string>, CreateOrderPayload>({
      query: (data) => ({
        url: '/create-order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getOrders'],
    }),
    updateOrderStatus: builder.mutation<
      ApiResponse<string>,
      UpdateOrderPayload
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['getOrders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
