import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
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
  baseQuery: baseQueryWithAuth(API_URLS.category),
  reducerPath: 'category',

  tagTypes: ['GetAllCategories'],
  endpoints: (build) => ({
    getAllCategories: build.query<Category[], void>({
      query: () => '/',
      providesTags: ['GetAllCategories'],
      transformResponse: (response: { categories: Category[] }) =>
        response.categories,
    }),
    addCategory: build.mutation<ApiResponse<string>, AddCategoryInterface>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['GetAllCategories'],
    }),
    updateCategory: build.mutation<
      ApiResponse<string>,
      { id: string; data: FormData }
    >({
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
