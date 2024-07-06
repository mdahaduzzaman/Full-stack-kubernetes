import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setToken = (token: string, refresh: string) => {
  Cookies.set("accessToken", token, { path: "/" });
  Cookies.set("refreshToken", refresh, { path: "/" });
};
