'use client';

import React, { ReactNode, useEffect } from 'react';
import { getMeServer } from '@/lib/api/serverApi'; 
import { useAuthStore } from '@/lib/store/authStore';


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await getMeServer();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    verifyAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isAuthenticated === false) {
    return <div>Завантаження...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;