import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
import { API_URLS } from '@/constants/Urls';
import { ApiResponse } from '@/types/common';
import { DashboardData } from './dashboard';
export { type DashboardData } from '@/types/dashboard';

export const dashboardApi = createApi({
  baseQuery: baseQueryWithAuth(API_URLS.dashboard),
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
