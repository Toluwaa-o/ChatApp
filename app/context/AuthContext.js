"use client";

import { useState, createContext, useEffect } from 'react'
import axios from "axios";
import { getCookie } from "cookies-next";

export const AuthenticationContext = createContext({
  loading: false,
  error: null,
  data: null,
});

const AuthContext = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const checkUser = async () => {
    try {
      const jwt = getCookie("tjw");

      if (!jwt) {
        return setAuthState({ data: null, error: null, loading: false });
      }

      const res = await axios.get("http://localhost:3000/api/auth/me");
      setAuthState({ data: res.data, error: null, loading: false });
    } catch (err) {
      setAuthState({
        data: null,
        error: err.response.data.msg,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
