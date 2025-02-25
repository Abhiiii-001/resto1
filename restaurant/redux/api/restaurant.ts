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
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_RESTAURANT_BASE_URL}),
    reducerPath:"restaurant",
    endpoints: (build) => ({
        getAllRestaurantId: build.query<any,any>({
            query:() => ({
                url: '/all'
            })
        }),
        getRestaurantDetails: build.query<any,any>({
            query:(id) => ({
                url: `/${id}`
            })
        })
    })
})

export const {
    useGetAllRestaurantIdQuery,
    useGetRestaurantDetailsQuery
} = restaurantApi