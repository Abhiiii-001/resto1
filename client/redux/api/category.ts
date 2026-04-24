import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
export {
  type AddCategoryInterface,
  type Category,
  type UpdateCategoryInterface,
} from '@/types/category';
import { API_URLS } from '@/constants/Urls';
import { Category } from './category';
import { AddCategoryInterface } from './category';

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
    getAllCategories: build.query<Category[], void>({
      query: () => '/',
      providesTags: ['GetAllCategories'],
      transformResponse: (response: ApiResponse<Category[]>) => response.data
    }),
    addCategory: build.mutation<ApiResponse<string>, AddCategoryInterface>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
    updateCategory: build.mutation<ApiResponse<string>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
    deleteCategory: build.mutation<ApiResponse<string>, void>({
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
