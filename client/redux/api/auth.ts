import { RestaturantSignupInterface } from "@/app/Interfaces/Auth";
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";

export interface LoginInterface {
    email: string;
    password: string;
}
export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth" ,
         credentials: "include",
         prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                   headers.set("Authorization", `Bearer ${token}`);
            }
           return headers;
       },
        },),
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
        }),
        changePassword: build.mutation<any,any>({
            query: ({id,...data}) => ({
                url: `/change-password/${id}`,
                method: "PUT",
                body: data
            })
        }),
        resetPassword: build.mutation<any,string>({
            query: (email) => ({
                url: "/reset-password",
                method: "PUT",
                body: email
            })
        }),
        resetPasswordMaker: build.mutation<any,any>({
            query:({password,verificationToken}) => ({
                url: `/reset-password/${verificationToken}`,
                method: "PUT",
                body: password
            })
        })
    })
})

export const {
    useUserSignupMutation,
    useRestaurantSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyTokenMutation,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useResetPasswordMakerMutation
} = authApi