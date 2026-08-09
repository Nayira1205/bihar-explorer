import { createContext, useContext, useEffect, useState } from "react";
import { api, ApiClientError } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On first load, ask the API if the httpOnly cookie (if any) is still
  // valid, so a page refresh doesn't log the user out.
  useEffect(() => {
    api
      .getMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    setUser(res.data);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.register({ name, email, password });
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    checkingSession,

    // Existing API
    login,
    register,
    logout,

    // Aliases for added API pages
    signIn: login,
    signUp: register,
    signOut: logout,

    // Compatibility aliases
    loading: checkingSession,
    profile: user,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}

export { ApiClientError };
