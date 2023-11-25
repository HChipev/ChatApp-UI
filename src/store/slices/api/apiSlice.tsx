import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../identitySlice";
import { RootState } from "../../store";
import { RefreshTokenResponse } from "../../../interfaces/identity";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5182/api/",
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
      "Identity/refresh-token",
      api,
      extraOptions
    );

    if (!refreshResult.error) {
      const token = (refreshResult.data as RefreshTokenResponse).tokens.token;

      api.dispatch(setCredentials(token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
