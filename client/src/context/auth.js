import { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_API } from "../config";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    let dataFromLocalStorage = localStorage.getItem("auth");
    if (dataFromLocalStorage) {
      setAuth(JSON.parse(dataFromLocalStorage));
    }
  }, []);

  // config axios
  axios.defaults.baseURL = BACKEND_API;

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
