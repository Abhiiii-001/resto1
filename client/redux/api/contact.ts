import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types/common';
import { API_URLS } from '@/constants/Urls';

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
    baseUrl: API_URLS.contact,
  }),
  endpoints: (build) => ({
    submitContact: build.mutation<ApiResponse<string>, ContactUsPayload>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
