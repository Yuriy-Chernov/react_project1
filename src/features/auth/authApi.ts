import { baseApi } from '../../shared/api/baseApi';

import type { AuthUser } from './authSlice';

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = AuthUser & {
  accessToken: string;
  refreshToken: string;
  gender: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    getMe: build.query<AuthUser, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
