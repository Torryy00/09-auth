'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getMe } from '@/lib/api/clientApi';
import Loader from '../../components/Loader/Loader';
import type { User } from '@/types/user';

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/profile'];

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await getMe();
        setUser(me);

        if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
          router.replace('/');
        }
      } catch {
        setUser(null);

        if (PRIVATE_ROUTES.some(route => pathname.startsWith(route))) {
          router.replace('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
}