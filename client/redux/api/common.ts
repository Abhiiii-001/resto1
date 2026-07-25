import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../redux";
import { setLogout } from "../states/authSlice";

type ExtraOptions = {
    bypassErrorHandling?: boolean;
};

export const baseQueryWithAuth = (baseUrl: string): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    ExtraOptions
> => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    // Return the actual BaseQueryFn that gets called per request
    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (!extraOptions?.bypassErrorHandling) {
            if (result.error?.status === 401) {
                api.dispatch(setLogout());
                if (typeof window !== 'undefined') {
                    window.location.href = '/signin';
                }
            }
            if (result.error?.status === 404) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/not-found';
                }
            }
        }

        return result;
    };
};
