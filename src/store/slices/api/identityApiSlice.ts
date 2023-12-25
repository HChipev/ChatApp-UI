import { GoogleLogin, TokenResponse } from "../../../interfaces/identity";
import { apiSlice } from "./apiSlice";

export const identityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation<TokenResponse, GoogleLogin>({
      query: (credentials) => ({
        url: import.meta.env.VITE_GOOGLE_LOGIN_API_URL,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logOut: builder.mutation<void, void>({
      query: () => import.meta.env.VITE_LOGOUT_API_URL,
    }),
  }),
});

export const { useGoogleLoginMutation, useLogOutMutation } = identityApiSlice;
