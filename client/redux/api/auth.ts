import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`}),
    reducerPath:"authApi",
    tagTypes:["UserSignup" , "RestaurnatSignup" , "Login" , "Logout"],
    endpoints:(build) => ({
        userSignup: build.mutation({
            query:(formData) => ({
                url: "user/signup",
                method: "POST",
                body: formData
            }),
            invalidatesTags:["UserSignup"]
        }),
        restaurantSignup: build.mutation({
            query: (data) => ({
                url: "restaurant/signup",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["RestaurnatSignup"]
        }),
        login: build.query({
            query: (data) => ({
                url: "/login",
                body: data
            }),
            providesTags: ["Login"]
        }),
        logout: build.mutation({
            query:() => ({
                url: "/logout",
                method: "POST"
            }),
            invalidatesTags: ["Logout"]
        })
    })
})

export const {
    useUserSignupMutation,
    useRestaurantSignupMutation,
    useLoginQuery,
    useLogoutMutation
} = authApi