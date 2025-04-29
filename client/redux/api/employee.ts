import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";

export const employeeApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_USER_BASE_URL,
        credentials:"include",
         prepareHeaders: (headers, { getState }) => {
             const token = (getState() as RootState).auth.token;
             if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
             }
            return headers;
        }, 
    }),
    reducerPath:"employeeApi",
    tagTypes : ["getallEmployees"],

     
                //fetch all call
    endpoints:(builder) => ({
        getAllEmployees:builder.query({
            query: (restaurantId) => ({url: `/${restaurantId}`}),
            providesTags:["getallEmployees"]

        }),
                  
                    // post call
        addEmployee:builder.mutation<any,any>({
            query: ({restaurantId,...data}) => ({
                url:`/${restaurantId}`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]
        }),
                    // update call 
        updateEmployee:builder.mutation<any,any>({
            query:({id, ...data}) => ({
                url:`/${id}`,
                method: "PUT",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]

        }),

                //    delete cll
        deleteEmployee:builder.mutation<any,any>({
            query: ({id}) => ({
                url:`/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["getallEmployees"]

        })        
    })
});

export const {
    useGetAllEmployeesQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;