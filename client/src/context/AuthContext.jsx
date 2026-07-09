import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getProfile } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await getProfile();

        setUser(data.user);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);


  // Register
  const register = async (formData) => {
    const { data } = await registerUser(formData);

    localStorage.setItem("token", data.token);

    setToken(data.token);

    setUser(data.user);

    return data;
  };


  // Login
  const login = async (formData) => {
    const { data } = await loginUser(formData);

    localStorage.setItem("token", data.token);

    setToken(data.token);

    setUser(data.user);

    return data;
  };


  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
