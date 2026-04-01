import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
import { RestaurantDropdownChoics } from '@/types/restaurant';
import { API_URLS } from '@/constants/Urls';

export interface RestaurantIdInterface {
  id: string;
  name: string;
  resCode: string;
}

export const restaurantApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.restaurant,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['RestaurantDetails'],
  reducerPath: 'restaurant',

  endpoints: (build) => ({
    getAllRestaurantId: build.query<
      ApiResponse<RestaurantDropdownChoics>,
      void
    >({
      query: () => ({
        url: '/all',
      }),
    }),

    updateRestuarantDetails: build.mutation<
      ApiResponse<string>,
      { restaurantId: string; data: any }
    >({
      query: ({ restaurantId, ...data }) => ({
        url: `/${restaurantId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RestaurantDetails'],
    }),

    deleteRestaurant: build.mutation<any, any>({
      query: ({ restaurantId }) => ({
        url: `/delete/${restaurantId}`,
        method: 'PUT',
      }),
    }),

    getRestaurantDetails: build.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ['RestaurantDetails'],
    }),
  }),
});

export const {
  useGetAllRestaurantIdQuery,
  useUpdateRestuarantDetailsMutation,
  useDeleteRestaurantMutation,
  useGetRestaurantDetailsQuery,
} = restaurantApi;
