import { baseApi } from '../../shared/api/baseApi';

import type { Product, ProductsResponse } from './types';

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { limit?: number; skip?: number } | void>({
      query: (params) => ({
        url: 'products',
        params: {
          limit: params?.limit ?? 30,
          skip: params?.skip ?? 0,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    searchProducts: build.query<ProductsResponse, { q: string; limit?: number }>({
      query: ({ q, limit = 30 }) => ({
        url: 'products/search',
        params: { q, limit },
      }),
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    getProductById: build.query<Product, string | number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useSearchProductsQuery } = productsApi;
