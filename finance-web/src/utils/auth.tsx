import * as React from 'react';
import type { CreateTokenResponse } from '../api/model';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (user: CreateTokenResponse) => Promise<void>;
  logout: () => Promise<void>;
  user: CreateTokenResponse | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = 'user';

export function getStoredUser() {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as CreateTokenResponse;
}

export function setStoredUser(user: CreateTokenResponse | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = React.useState<CreateTokenResponse | null>(
    getStoredUser()
  );

  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (user: CreateTokenResponse) => {
    setStoredUser(user);
    setUser(user);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
