import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@shared/schema';
import { apiRequest } from './queryClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isOwner: boolean;
  isVisitor: boolean;
  isDeveloper: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const result = await apiRequest<{ user: User; token: string }>('POST', '/api/auth/login', { username, password });
      localStorage.setItem('ccredoma-token', result.token);
      return result.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/auth/logout', {});
      localStorage.removeItem('ccredoma-token');
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/auth/me'], null);
      queryClient.clear();
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAdmin = user?.role === 'CentroComercialAdmin';
  const isOwner = user?.role === 'LocalOwner';
  const isVisitor = !user || user?.role === 'VisitanteExterno';
  const isDeveloper = user?.role === 'Developer';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isOwner, isVisitor, isDeveloper }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
