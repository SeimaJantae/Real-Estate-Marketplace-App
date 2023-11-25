import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ForgotPassworld() {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, { email });

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email for password reset link.");
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
          <h4 className="mt-4 text-center">Forgot password</h4>
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

            <button disabled={loading} type="submit" className="btn btn-primary mt-4 col-12">
              {loading ? "Waiting..." : "Submit"}
            </button>
            <div className="d-flex justify-content-center mt-4">
              <Link className="text-primary" to="/login">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassworld;
