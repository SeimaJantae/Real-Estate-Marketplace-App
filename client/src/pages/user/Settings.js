import React, { useState } from "react";
import SideBar from "../../components/nav/SideBar";
import slugify from "slugify";
import ProfileImageUpload from "../../components/forms/ProfileImageUpload";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = axios.put("/update-password", { password });
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setLoading(false);
        toast.success("Update password successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-lg">
      <SideBar />
      <h5 className="mt-2">Settings</h5>
      <div className="container mt-2">
        <div className="col-lg-4 offset-lg-4 mt-2">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Update your password"
              className="form-control mt-4"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button disabled={loading} type="submit" className="btn btn-primary mt-4 col-12">
              {loading ? "Processing..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
      {/* <pre>{JSON.stringify({ username, name, email, address, company, phone, photo })}</pre> */}
    </div>
  );
};

export default Settings;
