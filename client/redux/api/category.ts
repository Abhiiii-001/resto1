import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
import {
  AddCategoryInterface,
  Category,
  UpdateCategoryInterface,
} from '@/types/category';
import { API_URLS } from '@/constants/Urls';

export const categoryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.category,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'category',

  tagTypes: ['GetAllCategories'],
  endpoints: (build) => ({
    getAllCategories: build.query<ApiResponse<Category[]>, void>({
      query: () => '/',
      providesTags: ['GetAllCategories'],
    }),
    addCategory: build.mutation<void, AddCategoryInterface>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
    updateCategory: build.mutation<void, UpdateCategoryInterface>({
      query: (id, ...body) => ({
        url: `/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
    deleteCategory: build.mutation<void, void>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
