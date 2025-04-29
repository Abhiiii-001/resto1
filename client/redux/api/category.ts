import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";
import { useSelector } from "react-redux";


export interface Category {
    id: string,
    name: string,
    thumbnail: string,
}

export interface AddCategoryInterface{
    name: string,
    thumbnail: File,
}

export interface UpdateCategoryInterface{
    name ?: string,
    thumbnail ?: string
}

export interface GetCategoryInterface {
    message ?: string,
    categories : Category[]
}


export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_CATEGORY_BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },      
    }),
    reducerPath: "category",
    
    tagTypes:["GetAllCategories"],
    endpoints: (build) => ({
        getAllCategories: build.query<GetCategoryInterface,void>({
            query: () => "/",
            providesTags: ["GetAllCategories"]
        }),
        addCategory: build.mutation<void,FormData>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["GetAllCategories"]
        }),
        updateCategory: build.mutation<void,UpdateCategoryInterface>({
            query: (id,...body) => ({
                url: `/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["GetAllCategories"]
        }),
        deleteCategory: build.mutation<void,void>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["GetAllCategories"]
        })
    })
})

export const {
   useAddCategoryMutation,
   useGetAllCategoriesQuery,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation
} = categoryApi;