import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../identitySlice";
import { RootState } from "../../store";
import { TokenResponse } from "../../../interfaces/identity";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).identity.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      import.meta.env.VITE_REFRESH_TOKEN_API_URL,
      api,
      extraOptions
    );

    if (!refreshResult.error) {
      const token = (refreshResult.data as TokenResponse).tokens.token;

      api.dispatch(setCredentials(token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(import.meta.env.VITE_LOGOUT_API_URL, api, extraOptions);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
