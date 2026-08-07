import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type AuthSliceState = {
  auth: {
    token: string | null;
  };
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
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
