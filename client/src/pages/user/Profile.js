import React, { useEffect, useState } from "react";
import SideBar from "../../components/nav/SideBar";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import ProfileImageUpload from "../../components/forms/ProfileImageUpload";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  //hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user.username);
      setName(auth.user.name);
      setEmail(auth.user.email);
      setAddress(auth.user.address);
      setCompany(auth.user.company);
      setPhone(auth.user.phone);
      setPhoto(auth.user.photo);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = axios.put("/update-profile", { username, name, email, address, company, phone, photo });
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        const updateAuthLocalStore = JSON.parse(localStorage.getItem("auth"));
        updateAuthLocalStore.user = data;
        localStorage.setItem("auth", JSON.stringify(updateAuthLocalStore));
        setLoading(false);
        toast.success("Update profile successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-lg">
      <SideBar />
      <h5 className="mt-2">Profile</h5>
      <div className="container mt-2">
        <div className="col-lg-4 offset-lg-4 mt-2">
          <ProfileImageUpload photo={photo} setPhoto={setPhoto} uploading={uploading} setUploading={setUploading} />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Update your username"
              className="form-control mt-4"
              value={username}
              onChange={(e) => {
                setUsername(slugify(e.target.value.toLowerCase()));
              }}
            />
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control mt-4"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Update your email"
              className="form-control mt-4"
              disabled={true}
              value={email}
            />
            <input
              type="text"
              placeholder="Enter your address"
              className="form-control mt-4"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter your company"
              className="form-control mt-4"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter your phone"
              className="form-control mt-4"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <button disabled={loading} type="submit" className="btn btn-primary mt-4 col-12">
              {loading ? "Processing..." : "Update profile"}
            </button>
          </form>
        </div>
      </div>
      {/* <pre>{JSON.stringify({ username, name, email, address, company, phone, photo })}</pre> */}
    </div>
  );
};

export default Profile;
