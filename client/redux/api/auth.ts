import { RestaturantSignupInterface } from "@/app/Interfaces/Auth";
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginInterface {
    email: string;
    password: string;
}
export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth" , credentials: "include"},),
    reducerPath:"authApi",
    tagTypes:["UserSignup" , "RestaurnatSignup" , "Login" , "Logout"],
    endpoints:(build) => ({
        userSignup: build.mutation<any,any>({
            query:(formData) => ({
                url: "user/signup",
                method: "POST",
                body: formData
            }),
            invalidatesTags:["UserSignup"]
        }),
        restaurantSignup: build.mutation<any,any>({
            query: (data) => ({
                url: "restaurant/signup",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["RestaurnatSignup"]
        }),
        login: build.mutation<any,LoginInterface>({
            query: (data) => ({
                url: "/login",
                method:"POST",
                body: data
            }),
        }),
        logout: build.mutation<null,string>({
            query:(token) => ({
                url: "/logout",
                method: "POST",
                body: token
            }),
            invalidatesTags: ["Logout"]
        }),
        verifyToken: build.mutation<string,string>({
            query: (token) => ({
                url: "/verify-token",
                method: "POST",
                body: {
                    token: token
                }
            })
        })
    })
})

export const {
    useUserSignupMutation,
    useRestaurantSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyTokenMutation
} = authApi