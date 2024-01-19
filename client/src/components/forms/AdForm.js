import React from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdForm = ({ action, type }) => {
  // state
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    removing: false,
    price: "",
    address: "",
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad create successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setAd({ ...ad, loading: false });
    }
  };
  return (
    <div className="mt-4 col-lg-4 offset-lg-4">
      <form>
        <ImageUpload ad={ad} setAd={setAd} />
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            onChange={(e) => {
              setAd({ ...ad, address: e.target.value });
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <CurrencyInput
            placeholder="Enter price"
            defaultValue={ad.price}
            className="form-control"
            onValueChange={(value) => {
              setAd({ ...ad, price: value });
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            onChange={(e) => {
              setAd({ ...ad, title: e.target.value });
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            onChange={(e) => {
              setAd({ ...ad, description: e.target.value });
            }}
          />
        </div>

        <button type="submit" className={`btn btn-primary ${ad.loading ? "disabled" : ""}`} onClick={handleClick}>
          {ad.loading ? "Saving" : "Create"}
        </button>
      </form>
      {/* {JSON.stringify(ad)} */}
    </div>
  );
};

export default AdForm;
