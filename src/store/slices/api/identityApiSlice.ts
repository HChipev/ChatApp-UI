import { GoogleLogin, TokenResponse } from "../../../interfaces/identity";
import { apiSlice } from "./apiSlice";

export const identityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation<TokenResponse, GoogleLogin>({
      query: (credentials) => ({
        url: "Identity/google-login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logOut: builder.mutation<void, void>({
      query: () => "Identity/logout",
    }),
  }),
});

export const { useGoogleLoginMutation, useLogOutMutation } = identityApiSlice;
