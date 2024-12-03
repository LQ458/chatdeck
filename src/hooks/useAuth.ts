import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  isNewUser?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,
      error: null,

      signIn: async (identifier: string, password: string) => {
        try {
          const response = await axios.post("/api/auth/signin", {
            identifier,
            password,
          });

          const { user, token } = response.data;
          localStorage.setItem("token", token);

          set({
            user,
            token,
            isAuthenticated: true,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "登录失败" });
          throw error;
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          const response = await axios.post("/api/auth/signup", {
            email,
            password,
            name,
          });

          const { user, token } = response.data;
          localStorage.setItem("token", token);

          set({
            user,
            token,
            isAuthenticated: true,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "注册失败" });
          throw error;
        }
      },

      signOut: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      signInWithGoogle: async () => {
        window.location.href = "/api/auth/google";
      },

      updateUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
