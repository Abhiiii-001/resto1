import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateSubOrderInterface {
    name: string;
    variant: string;
    productVariantId: string;
    quantity: number,
    unitPrice: number,
};

export interface CreateOrderInterface {
    name?: string;
    note?: string;
    amount: number,
    isPack: boolean,
    paymentOption: string;
    restaurantId: string;
    orders: CreateSubOrderInterface[];
}


export const orderApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_ORDER_BASE_URL,
        credentials:'include'
    }),
    reducerPath: "order",
    endpoints:(build) => ({
        createOrder: build.mutation({
            query: (data) => ({
                url: "/create-order",
                method: "POST",
                body: data
            })
        }),
        subscribe: build.mutation({
            query: (data) => ({
                url: '/subscribe',
                method: "PUT",
                body: data
            })
        })
    })
});

export const { useCreateOrderMutation , useSubscribeMutation } = orderApi;