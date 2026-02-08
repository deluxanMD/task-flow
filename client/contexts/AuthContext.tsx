'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';
import {
  AuthContextType,
  AuthResponse,
  ErrorResponse,
  JWTDecoded,
  User,
} from '@/types/AuthTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if token is valid
  const isTokenValid = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JWTDecoded>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser && isTokenValid(token)) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        } catch {
          // Invalid JSON, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      router.push('/dashboard');
    } catch (error) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.error || 'Login failed. Please try again.'
      );
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post<AuthResponse>(
        '/api/auth/register',
        {
          name,
          email,
          password,
        }
      );

      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      router.push('/dashboard');
    } catch (error) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
