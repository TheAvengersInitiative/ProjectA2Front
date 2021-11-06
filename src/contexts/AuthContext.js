import React, { useContext, useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const getUserInfo = () => isLoggedIn;

  const isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const setUserInfo = (response) => {
    setIsLoggedIn(true);
    setToken(response.headers.token);
    localStorage.setItem("token", response.headers.token);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logOut,
        getUserInfo,
        setUserInfo,
        isUserLoggedIn,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
