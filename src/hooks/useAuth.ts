import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      signIn: async (identifier: string, password: string) => {
        try {
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Sign in failed");
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Sign in failed:", error);
          throw error;
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
          });

          if (!response.ok) {
            throw new Error("Registration failed");
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Sign up failed:", error);
          throw error;
        }
      },

      signOut: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      signInWithGoogle: async () => {
        // TODO: Implement Google OAuth
        window.location.href = "/api/auth/google";
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
