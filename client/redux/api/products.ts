import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './common';
import { ApiResponse } from '@/types/common';
import {
  type CreateProductInterface,
  type CreateProductVariantInterface,
  type ProductInterface,
  type ProductVariantInterface,
  type UpdateProductInterface,
  type UpdateProductVariantInterface,
} from '@/types/products';
import { API_URLS } from '@/constants/Urls';

export const productApi = createApi({
  baseQuery: baseQueryWithAuth(API_URLS.product),
  reducerPath: 'product',
  tagTypes: ['Products', 'ProductVariants'],
  endpoints: (build) => ({
    getProducts: build.query<
      { products: ProductInterface[]; message: string },
      string
    >({
      query: (id) => `/${id}`,
      providesTags: ['Products', 'ProductVariants'],
    }),

    createProduct: build.mutation<string, CreateProductInterface>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: build.mutation<
      string,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    getAllProductVariant: build.query<
      ApiResponse<ProductVariantInterface[]>,
      void
    >({
      query: () => '/variant',
      providesTags: ['ProductVariants', 'Products'],
    }),
    createProductVariant: build.mutation<string, CreateProductVariantInterface>(
      {
        query: (data) => ({
          url: '/variant',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Products'],
      },
    ),
    updateProductVariant: build.mutation<string, UpdateProductVariantInterface>(
      {
        query: (data) => ({
          url: `/variant/${data.id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['ProductVariants', 'Products'],
      },
    ),
    deleteProductVariant: build.mutation<void, string>({
      query: (id) => ({
        url: `/variant/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetAllProductVariantQuery,
  useCreateProductVariantMutation,
  useDeleteProductVariantMutation,
  useUpdateProductVariantMutation,
} = productApi;
