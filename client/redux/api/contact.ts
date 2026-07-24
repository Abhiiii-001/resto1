import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types/common';

export interface ContactUsPayload {
  name: string;
  email: string;
  message: string;
  type?: string;
  phone?: string;
  subject?: string;
}

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (build) => ({
    submitContact: build.mutation<ApiResponse<string>, ContactUsPayload>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
