// src/redux/api/authApiSlice.js
import { apiSlice } from "./ApiSlice";
import { setCredentials } from "../reducers/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
 console.log("🟢 Gələn data:", data); 
          dispatch(setCredentials({
            user: data.user,         // İçində balance, name, email və s.
            token: data.token,
          }));

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        } catch (err) {
          console.error('Login error:', err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
