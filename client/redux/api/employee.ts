import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    reducerPath:"employeeApi",
    tagTypes : ["getallEmployees"],

     
                //fetch all call
    endpoints:(builder) => ({
        getAllEmployees:builder.query({
            query: () => ({url: "/employees"}),
            providesTags:["getallEmployees"]

        }),
                  
                    // post call
        addEmployee:builder.mutation<any,any>({
            query: (data) => ({
                url:"/employees",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]

        }),
                    // update call 
        updateEmployee:builder.mutation<any,any>({
            query:({id, data}) => ({
                url:`/employees/${id}`,
                method: "PATCH",
                body:data,
            }),
            invalidatesTags:["getallEmployees"]

        }),

                //    delete cll
        deleteEmployee:builder.mutation<any,any>({
            query: (id) => ({
                url:`/employees/${id}`,
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