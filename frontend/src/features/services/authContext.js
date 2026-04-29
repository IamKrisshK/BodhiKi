import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const updateUser = (updated) => {
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);