import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";
import { RootState } from "../redux";

export interface RestaurantIdInterface {
    id: string,
    name: string,
    resCode: string
}

export const restaurantApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_RESTAURANT_BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
                    const token = (getState() as RootState).auth.token;
                    if (token) {
                           headers.set("Authorization", `Bearer ${token}`);
                    }
                   return headers;
                },
    }),
    tagTypes: ["RestaurantDetails"],
    reducerPath:"restaurant",
    endpoints: (build) => ({
        getAllRestaurantId: build.query<any,any>({
            query:() => ({
                url: '/all'
            })
        }),
        updateRestuarantDetails: build.mutation<any,any>({
            query: ({restaurantId,...data}) => ({
                url: `/${restaurantId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags:["RestaurantDetails"]
        }),
        deleteRestaurant: build.mutation<any,any>({
            query: ({restaurantId}) => ({
                url: `/delete/${restaurantId}`,
                method: "PUT"
            })
        }),
        getRestaurantDetails: build.query({
            query: ({id}) => ({
                url:`/${id}`
            }),
            providesTags: ["RestaurantDetails"]
        })
    })
})

export const {
    useGetAllRestaurantIdQuery,
    useUpdateRestuarantDetailsMutation,
    useDeleteRestaurantMutation
} = restaurantApi