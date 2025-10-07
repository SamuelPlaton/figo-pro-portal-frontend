'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PageLoader } from '@/components/page-loader';
import { User } from '@/types';

type AuthContextType = {
  isAuthenticated: boolean;
  user?: User | null;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<User | null>();

  const refreshAuth = async () => {
    try {
      setUser(undefined);
      setIsAuthenticated(undefined);
      const response = await api.auth.me();
      setIsAuthenticated(response.data.authenticated);
      setUser(response.data.user);
    } catch (error) {
      console.error('An error happened during User retrieve', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!isAuthenticated, refreshAuth, user }}>
      {isAuthenticated === undefined || user === undefined ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
