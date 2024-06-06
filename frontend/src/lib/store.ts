import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface UserState {
  user: User;
  add: (user: User) => void;
  reset: () => void;
}

const initialState: User = {
  id: "",
  first_name: "",
  last_name: "",
  username: "",
  email: "",
};

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: initialState,
      add: (user: User) => set({ user }),
      reset: () => set({ user: initialState }),
    }),
    { name: "user-store" }
  ) as any
);
