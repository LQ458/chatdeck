import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  isNewUser: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  updateUser: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    updateUser: (user: User) => {
      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true
      }));
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    axios.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.data.user,
        loading: false
      }));
    })
    .catch(() => {
      localStorage.removeItem('token');
      setState(prev => ({
        ...prev,
        loading: false
      }));
    });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}; 