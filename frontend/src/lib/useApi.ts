import useInterceptor from "./useInterceptor";
import { SignupType } from "./types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log("apiurl", API_URL);
console.log("apiurl", import.meta.env);

function useApi() {
  const axiosInterceptor = useInterceptor();

  const api = {
    signup: (data: SignupType, params = {}) =>
      axios.post(`${API_URL}/api/users/`, data, { params: params }),
  };

  return api;
}

export default useApi;
