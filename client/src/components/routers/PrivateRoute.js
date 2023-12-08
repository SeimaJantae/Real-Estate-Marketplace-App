import React from "react";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  //context
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/current-user", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOk(true);
    } catch (error) {
      setOk(false);
      console.log(error);
      toast.error("Please login first.");
    }
  };
  return ok ? <Outlet></Outlet> : "";
};

export default PrivateRoute;
