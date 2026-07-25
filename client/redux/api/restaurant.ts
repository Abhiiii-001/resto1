import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
import { ApiResponse } from '@/types/common';
import { Restaurant, RestaurantDropdownChoics } from '@/types/restaurant';
import { API_URLS } from '@/constants/Urls';

export interface RestaurantIdInterface {
  id: string;
  name: string;
  resCode: string;
}

export const restaurantApi = createApi({
  baseQuery: baseQueryWithAuth(API_URLS.restaurant),

  tagTypes: ['RestaurantDetails'],
  reducerPath: 'restaurant',

  endpoints: (build) => ({
    getAllRestaurantId: build.query<RestaurantDropdownChoics[], void>({
      query: () => ({
        url: '/all',
      }),
      transformResponse: (response: {
        message: string;
        restaurant: RestaurantDropdownChoics[];
      }) => response.restaurant,
    }),

    updateRestuarantDetails: build.mutation<
      ApiResponse<string>,
      Partial<Restaurant>
    >({
      query: ({ restaurantId, ...data }) => ({
        url: `/${restaurantId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RestaurantDetails'],
    }),

    deleteRestaurant: build.mutation<ApiResponse<string>, any>({
      query: ({ restaurantId }) => ({
        url: `/delete/${restaurantId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['RestaurantDetails'],
    }),

    getRestaurantDetails: build.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse: (response: { success: boolean; data: any }) =>
        response.data,
      providesTags: ['RestaurantDetails'],
    }),

    raiseApprovalRequest: build.mutation<ApiResponse<string>, any>({
      query: ({ restaurantId }) => ({
        url: `/raise-approval/${restaurantId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['RestaurantDetails'],
    })
  }),
});

export const {
  useGetAllRestaurantIdQuery,
  useUpdateRestuarantDetailsMutation,
  useDeleteRestaurantMutation,
  useGetRestaurantDetailsQuery,
  useRaiseApprovalRequestMutation
} = restaurantApi;
