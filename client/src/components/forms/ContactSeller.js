import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";

const ContactSeller = ({ ad }) => {
  // context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  // hooks
  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/contact-seller", {
        name,
        email,
        message,
        phone,
        adId: ad._id,
      });
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setMessage("");
        setLoading(false);
        toast.success("Send email contact successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      setName(auth?.user.name);
      setEmail(auth?.user.email);
      setPhone(auth?.user.phone);
    }
  }, [loggedIn]);

  return (
    <div className="mt-4">
      <h5> Enquire of {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username}</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="form-control mt-2"
          placeholder="Text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          disabled={!loggedIn}
        ></textarea>
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Enter your name"
          value={name}
          disabled={!loggedIn}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-4"
          value={email}
          placeholder="Enter your email"
          disabled={!loggedIn}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Enter your phone"
          value={phone}
          disabled={!loggedIn}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <button disabled={!name || !email || loading} type="submit" className="btn btn-primary mt-4 col-12">
          {loggedIn ? (loading ? "Processing..." : "Enquire") : "Login to enquire"}
        </button>
      </form>
    </div>
  );
};

export default ContactSeller;
