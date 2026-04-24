import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { API_URLS } from '@/constants/Urls';
import { ApiResponse } from '@/types/common';
import { DashboardData } from './dashboard';
export { type DashboardData } from '@/types/dashboard';

export const dashboardApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.dashboard,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'dashboardApi',
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, string>({
      query: (restaurantId) => ({ url: `/${restaurantId}` }),
      transformResponse: (response: ApiResponse<DashboardData>) =>
        response.data,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
