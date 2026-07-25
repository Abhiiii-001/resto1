import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

export interface RestaurantDetailsInterface{
    id: string;
    resCode: string;
    name: string;
    slogan?: string;
    thumbnail: string;
    isOpen: boolean;
    number: string;
    address: string;
    email?: string;
    password?: string;
    
}

export interface RestaurantIdInterface {
    id: string,
    name: string,
    resCode: string
}

export const restaurantApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant`}),
    reducerPath:"restaurant",
    endpoints: (build) => ({
        getAllRestaurantId: build.query<{ restaurant: RestaurantIdInterface[] }, void>({
            query:() => ({
                url: '/all'
            })
        }),
        getRestaurantDetails: build.query<{ data: RestaurantDetailsInterface }, string>({
            query:(id) => ({
                url: `/customer/${id}`
            })
        })
    })
})

export const {
    useGetAllRestaurantIdQuery,
    useGetRestaurantDetailsQuery
} = restaurantApi