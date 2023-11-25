import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(email, password);
      setLoading(true);
      const { data } = await axios.post(`/pre-register`, { email, password });

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email to activate this account");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="col-lg-4 offset-lg-4">
          <h4 className="mt-4 text-center">Register</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="InputEmail" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword" className="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                placeholder="Password"
                autoComplete="off"
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary mt-4 col-12">
              {loading ? "Waiting..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
