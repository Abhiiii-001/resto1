import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
import { ApiResponse } from '@/types/common';
import { AddUpdateUserPayload, User } from '@/types/employee';
import { API_URLS } from '@/constants/Urls';

export const employeeApi = createApi({
  baseQuery: baseQueryWithAuth(API_URLS.user),
  reducerPath: 'employeeApi',
  tagTypes: ['getallEmployees'],

  //fetch all call
  endpoints: (builder) => ({
    getEmployeeDetails: builder.query<User & { restaurant?: any }, string>({
      query: (userId) => ({ url: `/id/${userId}` }),
      providesTags: ['getallEmployees'],
      transformResponse: (response: { data: User & { restaurant?: any } }) => response.data,
    }),
    getAllEmployees: builder.query<User[], string>({
      query: (restaurantId) => ({ url: `/${restaurantId}` }),
      providesTags: ['getallEmployees'],
      transformResponse: (response: { users: User[] }) => response.users,
    }),

    // post call
    addEmployee: builder.mutation<ApiResponse<string>, AddUpdateUserPayload>({
      query: ({ restaurantId, ...data }) => ({
        url: `/${restaurantId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getallEmployees'],
    }),
    // update call
    updateEmployee: builder.mutation<
      ApiResponse<string>,
      Partial<AddUpdateUserPayload>
    >({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['getallEmployees'],
    }),

    //delete call
    deleteEmployee: builder.mutation<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getallEmployees'],
    }),
  }),
});

export const {
  useGetEmployeeDetailsQuery,
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
