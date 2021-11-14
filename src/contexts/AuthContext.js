import React, { useContext, useState, createContext, useEffect } from "react";
import { getNotification } from "../utils/Projects";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState([]);

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

  const fetchNotification = async () => {
    try {
      const response = await getNotification(token);
      setNotification(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchNotification();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logOut,
        getUserInfo,
        setUserInfo,
        isUserLoggedIn,
        token,
        notification,
        fetchNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
