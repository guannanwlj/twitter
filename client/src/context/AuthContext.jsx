import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, getToken, getStoredUser, setStoredUser, setToken, clearAuth } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [ready, setReady] = useState(!!getToken());

  useEffect(() => {
    if (getToken() && !getStoredUser()) {
      api
        .me()
        .then((d) => setUser(d.user))
        .catch(() => clearAuth())
        .finally(() => setReady(true));
    } else if (!getToken()) {
      setReady(true);
    } else {
      setReady(true);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    const d = await api.login({ username, password });
    setToken(d.token);
    setStoredUser(d.user);
    setUser(d.user);
  }, []);

  const register = useCallback(async (data) => {
    const d = await api.register(data);
    setToken(d.token);
    setStoredUser(d.user);
    setUser(d.user);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const d = await api.me();
      setUser(d.user);
      setStoredUser(d.user);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout, refresh }),
    [user, ready, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
