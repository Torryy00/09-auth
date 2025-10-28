'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { getMeServer } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await getMeServer();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [setUser, clearIsAuthenticated]);

  return (
    <>
      {children}
      {loading && <div className="loading-overlay">Завантаження...</div>}
    </>
  );
};

export default AuthProvider;
