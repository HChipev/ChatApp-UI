import { apiSlice } from "./apiSlice";

export const identityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "Identity/google-login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGoogleLoginMutation } = identityApiSlice;
