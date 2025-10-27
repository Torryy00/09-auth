"use client";

import { ReactNode, useEffect, useState } from "react";
import { checkSession, logout as logoutApi } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (err) {
        await logoutApi();
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // или любой лоадер
  }

  return <>{children}</>;
};

export default AuthProvider;