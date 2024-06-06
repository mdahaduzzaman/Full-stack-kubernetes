import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

// Create an Axios instance using the base URL from the environment variable
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
const REFRESH_URL = process.env.REFRESH_URL || "http://localhost:8000/api/users/token/refresh/";

const api = axios.create({
  baseURL: BASE_URL,
});

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

// Request interceptor to add the access token to the headers
api.interceptors.request.use(
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

// Response interceptor to handle token refresh
api.interceptors.response.use(
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
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        // Redirect to login or handle refresh token expiration
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
