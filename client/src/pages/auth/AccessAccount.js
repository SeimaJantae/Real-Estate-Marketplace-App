import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";

function AccessAccount() {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Mounting
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const { data } = await axios.post("/access-account", { resetCode: token });
      if (data?.error) {
        toast(data.error);
      } else {
        // save data in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        // save data in context
        setAuth(data);
        toast.success("Please update your password in profile page");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try agian.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center vh-100 mt-5">Please wait...</div>
    </>
  );
}

export default AccessAccount;
