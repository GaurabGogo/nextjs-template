import { createApi } from "@reduxjs/toolkit/query/react";
import { unAuthorizedBaseQuery } from "@/lib/baseQuery";
import {
  ActivateRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  Response,
} from "./auth-model";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: unAuthorizedBaseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<Response, LoginRequest>({
      query: (loginRequest) => ({
        url: `auth/login`,
        method: "POST",
        body: loginRequest,
      }),
      invalidatesTags: ["Auth"], // Adjust based on caching needs
    }),
    register: builder.mutation<Response, RegisterRequest>({
      query: (registerRequest) => ({
        url: `auth/register`,
        method: "POST",
        body: registerRequest, // Use the provided registerRequest object
      }),
      invalidatesTags: ["Auth"], // Adjust based on caching needs
    }),
    logout: builder.mutation<Response, void>({
      query: () => ({
        url: `auth/logout`,
        method: "GET",
      }),
    }),
    refresh: builder.mutation<Response, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: `auth/refresh`,
        method: "POST",
        body: { refreshToken },
      }),
      invalidatesTags: ["Auth"], // Adjust based on caching needs
    }),
    activate: builder.mutation<Response, ActivateRequest>({
      query: (ActivateRequest) => ({
        url: `auth/activate`,
        method: "PATCH",
        body: ActivateRequest,
      }),
    }),
    forgotPassword: builder.mutation<Response, { email: string }>({
      query: ({ email }) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Auth"], // Adjust based on caching needs
    }),
    resetPassword: builder.mutation<Response, ResetPasswordRequest>({
      query: (ResetPasswordRequest) => ({
        url: `auth/reset-password`,
        method: "PATCH",
        body: ResetPasswordRequest,
      }),
      invalidatesTags: ["Auth"], // Adjust based on caching needs
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useActivateMutation,
  useRefreshMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
