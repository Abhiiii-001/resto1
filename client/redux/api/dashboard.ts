import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";

export const dashboardApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL,
        credentials: "include",
         prepareHeaders: (headers, { getState }) => {
                    const token = (getState() as RootState).auth.token;
                    if (token) {
                        headers.set("Authorization", `Bearer ${token}`);
                    }
                    return headers;
        }, 
    }),
    reducerPath: 'dashboardApi',
    endpoints: (builder) => ({
        getDashboardData: builder.query({
           query: (restaurantId) => ({url:`/${restaurantId}`}) 
        })
    })
});

export const { useGetDashboardDataQuery } = dashboardApi;