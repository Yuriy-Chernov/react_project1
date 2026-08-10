import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type AuthSliceState = {
  auth: {
    token: string | null;
  };
};

const baseUrl = process.env.API_BASE_URL || 'https://dummyjson.com/';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AuthSliceState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Product', 'User'],
  endpoints: () => ({}),
});
