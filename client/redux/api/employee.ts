import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
import { AddUpdateUserPayload, User } from '@/types/employee';
import { API_URLS } from '@/constants/Urls';

export const employeeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.user,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'employeeApi',
  tagTypes: ['getallEmployees'],

  //fetch all call
  endpoints: (builder) => ({
    getAllEmployees: builder.query<User[], string>({
      query: (restaurantId) => ({ url: `/${restaurantId}` }),
      providesTags: ['getallEmployees'],
      transformResponse: (response: {users: User[]}) => response.users,
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
    updateEmployee: builder.mutation<ApiResponse<string>, Partial<AddUpdateUserPayload>>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['getallEmployees'],
    }),

    //delete call
    deleteEmployee: builder.mutation<ApiResponse<string>, string>({
      query: ( id ) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getallEmployees'],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
