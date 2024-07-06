import useInterceptor from "./useInterceptor";
import { SignupType, LoginType } from "./types";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "./store";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function useApi() {
  const { reset } = useUserStore()
  const navigate = useNavigate()
  const axiosInterceptor = useInterceptor();

  const api = {
    signup: (data: SignupType, params = {}) =>
      axios.post(`${API_URL}/api/users/`, data, { params: params }),

    login: (data: LoginType, params = {}) =>
      axios.post(`${API_URL}/api/users/token/`, data, { params: params }),

    allBooks: (params = {}) => axiosInterceptor.get("/api/books/", { params: params }),

    logout: () => {
      localStorage.clear();
      Cookies.remove("all", { path: "/" });
      reset();
      navigate("/login");
    },
  };

  return api;
}

export default useApi;
