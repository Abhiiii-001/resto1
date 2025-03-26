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
  salePrice?: number;
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
  productVariants: ProductVariantInterface[];
  category:{
    name: string
  }
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
      query: (id) => `/${id}`,
      providesTags: ["Products","ProductVariants"],
    }),

    createProduct: build.mutation<string, File>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<string, {id: string, data: File}>({
      query: ({id,data}) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProductVariant: build.query<GetProductVariantInterface, void>({
      query: () => "/variant",
      providesTags: ["ProductVariants","Products"],
    }),
    createProductVariant: build.mutation<string, CreateProductVariantInterface>(
      {
        query: (data) => ({
          url: "/variant",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Products"],
      }
    ),
    updateProductVariant: build.mutation<string,any>(
      {
        query: (data) => ({
          url: `/variant/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["ProductVariants","Products"],
      }
    ),
    deleteProductVariant: build.mutation<void, string>({
      query: (id) => ({
        url: `/variant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
