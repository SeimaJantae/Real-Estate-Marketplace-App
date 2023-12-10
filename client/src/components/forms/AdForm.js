import React from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";

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
  });
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {JSON.stringify(ad)}
    </div>
  );
};

export default AdForm;
