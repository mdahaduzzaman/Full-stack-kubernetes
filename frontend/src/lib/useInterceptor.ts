import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

// Create an Axios instance using the base URL from the environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const REFRESH_URL = import.meta.env.VITE_REFRESH_URL || "http://localhost:8000/api/users/token/refresh/";

// Function to get a new access token using the refresh token
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post<{
      accessToken: string;
    }>(REFRESH_URL, {
      refreshToken: Cookies.get("refreshToken"),
    });

    // Update the access token in Cookies
    Cookies.set("accessToken", response.data.accessToken, { path: "/" });

    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

function useInterceptor() {
  const instance = axios.create({
    baseURL: API_URL,
  });

  // Request instance to add the access token to the headers
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get("accessToken");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response instance to handle token refresh
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
          // Redirect to login or handle refresh token expiration
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export default useInterceptor;
