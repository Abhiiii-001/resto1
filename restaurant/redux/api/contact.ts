import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ContactUsPayload {
  name: string;
  email: string;
  message: string;
  type?: string;
}

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/api',
  }),
  endpoints: (build) => ({
    submitContact: build.mutation<any, ContactUsPayload>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
