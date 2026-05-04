import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, useAppSelector } from "../redux";
import { useSelector } from "react-redux";

export interface ProductVariantsInterface {
   id: string;
   size: string;
   price: number;
   salePrice?: number;
   isOutOfStock: boolean;
   productId: string;
   orders: any;
}
export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  sold: number;
  rating?: number;
  productVariants: ProductVariantsInterface[]
  categoryId: string;  
}
export interface CategoryInterface {
    name: string;
    id: string;
    thumbnail: string;
    products: ProductInterface[]
}

interface MenuResponseInterface {
    success: boolean;
    message: string;
    data?: CategoryInterface[];
}

export const dataApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category`,
        credentials: "include"}),
    reducerPath: "data",
    tagTypes:["GetAllData"],
    endpoints: (build) => ({
       getMenu: build.query<MenuResponseInterface,string>({
        query:(id) => ({
            url:`/restaurant/${id}`
        })
       })
    })
})

export const {
  useGetMenuQuery
} = dataApi;