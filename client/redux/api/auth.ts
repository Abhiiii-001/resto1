import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';
import { ApiResponse } from '@/types/common';
import {
  ChangePasswordPayload,
  LoginPayload,
  ResetPasswordMakerPayload,
  ResetPasswordPayload,
  RestaurantSignupPayload,
  UserSignupPayload,
  VerifyTokenPayload,
} from '@/types/auth';
import { API_URLS } from '@/constants/Urls';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URLS.auth,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'authApi',
  tagTypes: ['UserSignup', 'RestaurnatSignup', 'Login', 'Logout'],
  endpoints: (build) => ({
    userSignup: build.mutation<ApiResponse<string>, UserSignupPayload>({
      query: (formData) => ({
        url: 'user/signup',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['UserSignup'],
    }),
    restaurantSignup: build.mutation<
      ApiResponse<string>,
      RestaurantSignupPayload
    >({
      query: (data) => ({
        url: 'restaurant/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RestaurnatSignup'],
    }),
    login: build.mutation<ApiResponse<string>, LoginPayload>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation<null, string>({
      query: (token) => ({
        url: '/logout',
        method: 'POST',
        body: token,
      }),
      invalidatesTags: ['Logout'],
    }),
    verifyToken: build.mutation<ApiResponse<string>, VerifyTokenPayload>({
      query: (data) => ({
        url: '/verify-token',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: build.mutation<ApiResponse<string>, ChangePasswordPayload>({
      query: ({ id, ...data }) => ({
        url: `/change-password/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    resetPassword: build.mutation<ApiResponse<string>, ResetPasswordPayload>({
      query: (data) => ({
        url: '/reset-password',
        method: 'PUT',
        body: data,
      }),
    }),
    resetPasswordMaker: build.mutation<
      ApiResponse<string>,
      ResetPasswordMakerPayload
    >({
      query: ({ password, verificationToken }) => ({
        url: `/reset-password/${verificationToken}`,
        method: 'PUT',
        body: { password },
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useRestaurantSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyTokenMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordMakerMutation,
} = authApi;
