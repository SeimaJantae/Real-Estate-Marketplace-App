import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "../../../components/nav/SideBar";

const AdEdit = ({ action, type }) => {
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

  const fetchAd = async (req, res) => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data.ad);
    } catch (error) {
      console.log(error);
    }
  };

  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.put(`/ad/${ad._id}`, ad);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setAd({ ...ad, loading: true });

      const { data } = await axios.delete(`/ad/${ad._id}`);
      // console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };
  return (
    <div className="container-lg">
      <SideBar></SideBar>
      <h5 className="pt-2">Ad edit</h5>
      <div className="mt-2">
        <div className="mt-4 col-lg-4 offset-lg-4">
          <form>
            <ImageUpload ad={ad} setAd={setAd} />
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                value={ad.address}
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
                value={ad.price}
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
                value={ad.title}
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
                value={ad.description}
                onChange={(e) => {
                  setAd({ ...ad, description: e.target.value });
                }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${ad.loading ? "disabled" : ""} col-6`}
              onClick={handleClick}
            >
              {ad.loading ? "Saving" : "Update"}
            </button>
            <button onClick={handleDelete} className={`btn btn-danger ${ad.loading ? "disabled" : ""} col-6`}>
              {ad.loading ? "Deleting..." : "Delete"}
            </button>
          </form>
          {/* {JSON.stringify(ad)} */}
        </div>
      </div>
    </div>
  );
};

export default AdEdit;
