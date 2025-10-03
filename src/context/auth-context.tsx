'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PageLoader } from '@/components/page-loader';
import { User } from '@/types';
import { AuthUser } from '@/lib/api/modules';

type AuthContextType = {
  isAuthenticated: boolean;
  user?: User | null;
  refreshAuth: () => Promise<void>;
  authUser?: AuthUser | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [authUser, setAuthUser] = useState<AuthUser | null>();
  const [user, setUser] = useState<User | null>();
  const refreshAuth = async () => {
    try {
      setUser(undefined);
      setIsAuthenticated(undefined);
      const res = await api.auth.me();
      setIsAuthenticated(res.data.authenticated);
      setAuthUser(res.data.user);
      if (res) {
        const resUser = await api.users.me();
        setUser(resUser);
      } else {
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setAuthUser(null);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!isAuthenticated, refreshAuth, user, authUser }}
    >
      {isAuthenticated === undefined || user === undefined ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
