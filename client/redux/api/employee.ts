import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_USER_BASE_URL,credentials:"include"}),
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
            query: ({data,restaurantId}) => ({
                url:`/${restaurantId}`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]
        }),
                    // update call 
        updateEmployee:builder.mutation<any,any>({
            query:({id, data}) => ({
                url:`/${id}`,
                method: "PUT",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]

        }),

                //    delete cll
        deleteEmployee:builder.mutation<any,any>({
            query: (id) => ({
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