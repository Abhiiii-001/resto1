import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces

export interface ProductVariantInterface {
  id: string;
  size: string;
  price: number;
  salePrice: number;
  isOutOfStock: boolean;
  productId: string;
}
export interface GetProductVariantInterface {
  message?: string;
  response: ProductVariantInterface[];
}
export interface CreateProductVariantInterface {
  size: string;
  price: number;
  salePrice: number;
  productId: string;
}
export interface UpdateProductVariantInterface {
  size?: string;
  price?: number;
  salePrice?: number;
}
export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  sold: number;
  rating?: number;
  categoryId: string;
  productVariant: ProductVariantInterface[];
}

export interface GetProductInterface {
  message?: string;
  products: ProductInterface[];
}

export interface AddProductInterface {
  name: string;
  description: string;
  thumbnail: File;
  categoryId: string;
}

export interface UpdateProductInterface {
  name?: string;
  description?: string;
  thumbnail?: File;
  rating?: number;
}


export const productApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/product',
    credentials: "include",
  }),
  reducerPath: "product",
  tagTypes: ["Products", "ProductVariants"],
  endpoints: (build) => ({
    getProducts: build.query<any, void>({
      query: () => "/",
      providesTags: ["Products"],
    }),

    createProduct: build.mutation<string, AddProductInterface>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<string, UpdateProductInterface>({
      query: (id, ...data) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<void, void>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProductVariant: build.query<GetProductVariantInterface, void>({
      query: () => "/variant",
      providesTags: ["ProductVariants"],
    }),
    createProductVariant: build.mutation<string, CreateProductVariantInterface>(
      {
        query: (data) => ({
          url: "/variant",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["ProductVariants"],
      }
    ),
    updateProductVariant: build.mutation<string, UpdateProductVariantInterface>(
      {
        query: (id, ...data) => ({
          url: `/variant/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["ProductVariants"],
      }
    ),
    deleteProductVariant: build.mutation<void, void>({
      query: (id) => ({
        url: `/variant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductVariants"],
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
