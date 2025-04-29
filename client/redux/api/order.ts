import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addOrdersBulk } from "../states/orderSlice";
import { RootState } from "../redux";


export const orderApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_ORDER_BASE_URL ,
         credentials:"include",
         prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                   headers.set("Authorization", `Bearer ${token}`);
            }
           return headers;
        },
        }),
    reducerPath:"orderApi",
    tagTypes: ["getOrders"],
    endpoints: (builder) => ({
        getAllOrders: builder.query<any,any>({
            query: (restaurantId) => ({url: `/${restaurantId}`}),
            async onQueryStarted(arg , { dispatch , queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    if(!data?.success){
                        throw new Error(data?.message);
                    }
                    const order = data?.data;
                    // console.log("Order api order response",order);
                    const filteredOrder = await order.filter((ord) => ord.status == "Pending" || ord.status == "Ready");
                    dispatch(addOrdersBulk(filteredOrder));
                } catch (error) {
                    console.log("Order save error",error);
                }
            },
            providesTags: ["getOrders"]
        }),
        createOrder: builder.mutation<any,any>({
            query: (data) => ({
                url: "/create-order",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["getOrders"]
        }),
        updateOrderStatus: builder.mutation<any,any>({
            query:({id,data}) => ({
              url: `/${id}`,
              method: "PUT",
              body: data
            }),
            invalidatesTags: ["getOrders"]
        }),
    }) 
})

export const {
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation
} = orderApi;