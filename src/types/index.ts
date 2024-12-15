export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

export interface Room {
  id: string;
  name: string;
  password?: string;
  createdAt: Date;
  participants: {
    id: string;
  }[];
  status: "active" | "inactive";
}

export interface CreateRoomInput {
  name: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  token?: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn?: (identifier: string, password: string) => Promise<void>;
  signUp?: (email: string, password: string, name: string) => Promise<void>;
  signOut?: () => void;
  signInWithGoogle?: () => Promise<void>;
  updateUser?: (user: User) => void;
}
