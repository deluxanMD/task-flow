export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface JWTDecoded {
  exp: number;
  userId: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}
