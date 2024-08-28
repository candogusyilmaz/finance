import * as React from 'react';
import type { CreateAccessTokenResponse } from 'src/api/types/TokenTypes';
export interface AuthContext {
  isAuthenticated: boolean;
  login: (user: CreateAccessTokenResponse) => Promise<void>;
  logout: () => Promise<void>;
  user: CreateAccessTokenResponse | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = 'user';

export function getStoredUser() {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as CreateAccessTokenResponse;
}

export function setStoredUser(user: CreateAccessTokenResponse | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = React.useState<CreateAccessTokenResponse | null>(getStoredUser());

  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (user: CreateAccessTokenResponse) => {
    setStoredUser(user);
    setUser(user);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const value = React.useMemo(() => ({ isAuthenticated, user, login, logout }), [isAuthenticated, user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
