import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getAccessToken,
  getARefreshToken,
  handleLogin,
  resetAuthCookies,
} from "./actions";

interface ErrorResponse {
  data: {
    error: {
      statusCode: number;
      message?: string;
      [key: string]: any;
    };
    [key: string]: any;
    messsage?: string;
  };
}

interface RefreshResponse {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const unAuthorizedBaseQuery = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

const authorizedBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = (await baseQueryWithAuth(
    args,
    api,
    extraOptions
  )) as ErrorResponse;

  // If the request fails with a 401 Unauthorized error (token expired), attempt to refresh the token
  if (result.data.error && result.data.error.statusCode === 401) {
    const refreshToken = await getARefreshToken();

    if (!refreshToken) {
      console.error("No refresh token found, logging out...");
      await resetAuthCookies();
      return result;
    }

    const refreshResult = (await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    )) as RefreshResponse;

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefreshToken } =
        refreshResult.data.data;

      // Store new tokens
      await handleLogin(accessToken, newRefreshToken);

      return baseQueryWithAuth(args, api, extraOptions);
    } else {
      await resetAuthCookies();
    }
  }

  return result;
};

export {
  baseQuery,
  baseQueryWithAuth,
  authorizedBaseQuery,
  unAuthorizedBaseQuery,
};
