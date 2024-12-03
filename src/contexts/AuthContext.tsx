import { createContext } from "react";
import { AuthState } from "../types";

export const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  updateUser: () => {},
});
