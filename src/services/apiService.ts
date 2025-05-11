import axios from "axios";
import { getAccessToken, getARefreshToken, handleLogin } from "@/lib/actions";

// Configure Axios instance with base URL
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to get refresh token
export const getRefreshToken = async (refreshToken: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
    {
      refreshToken,
    }
  );

  return {
    accessToken: response.data.data.accessToken,
    refreshToken: response.data.data.refreshToken,
  };
};

// Set up the request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up the response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Success response
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Get the new access token
      try {
        const refreshToken = await getARefreshToken();

        if (!refreshToken) throw new Error("No refresh token found");

        const newTokens = await getRefreshToken(refreshToken);

        // Store the new access token
        await handleLogin(newTokens.accessToken, newTokens.refreshToken);

        // Update the Authorization header
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newTokens.accessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle the case when refresh token fails (e.g., redirect to login)
        console.error("Refresh token failed", refreshError);
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const apiService = {
  get: async function (
    url: string,
    params: Record<string, any> = {}
  ): Promise<any> {
    console.log("GET", url, params);

    try {
      const token = await getAccessToken();

      const response = await axiosInstance.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log("POST", url, data);

    try {
      const token = await getAccessToken();

      const response = await axiosInstance.post(url, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  patch: async function (url: string, data: any): Promise<any> {
    console.log("PATCH", url, data);

    try {
      const token = await getAccessToken();

      const response = await axiosInstance.patch(url, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("POST (no token)", url, data);

    try {
      const response = await axiosInstance.post(url, data);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export default apiService;
