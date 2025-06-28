// src/redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777',
    prepareHeaders: (headers, { getState }) => {
      // Məsələn, tokeni localStorage-dən almaq:
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed?.token) {
            headers.set('authorization', `Bearer ${parsed.token}`);
          }
        }
      } catch (e) {
        console.error('❌ Token parse error:', e);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
