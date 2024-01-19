import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const AdView = () => {
  //state
  const [ad, setAd] = useState({});
  // hooks
  const params = useParams();
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (params?.slug) fetchAd();
    //console.log(ad);
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params?.slug}`);
      //console.log(data);
      setAd(data?.ad);
      //console.log(ad);
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = (photos) => {
    let arr = [];
    photos?.map((p) => {
      arr.push({
        original: p.Location,
        thumbnail: p.Location,
      });
    });
    //console.log(arr);
    return arr;
  };

  const handleLink = async () => {
    try {
      if (auth.user === null) {
        toast.error("Please login first.");
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      const updateAuthLocalStore = JSON.parse(localStorage.getItem("auth"));
      updateAuthLocalStore.user = data;
      localStorage.setItem("auth", JSON.stringify(updateAuthLocalStore));
      toast.success("Added to wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlink = async () => {
    try {
      if (auth.user === null) {
        toast.error("Please login first.");
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      setAuth({ ...auth, user: data });

      const updateAuthLocalStore = JSON.parse(localStorage.getItem("auth"));
      updateAuthLocalStore.user = data;
      localStorage.setItem("auth", JSON.stringify(updateAuthLocalStore));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-lg">
      <div className="row mt-4">
        <div className="col-lg-4">
          <div className="d-flex justify-content-between me-4">
            <div>
              <button className="btn btn-info disabled">
                {ad.type ? ad.type : ""} for {ad.action ? ad.action : ""}
              </button>
              <p className="h6 mt-2">{ad?.sold ? "Off market" : "In market"}</p>
            </div>
            <>
              {auth.user?.wishList?.includes(ad?._id) ? (
                <FcLike onClick={handleUnlink} size={30} />
              ) : (
                <FcLikePlaceholder onClick={handleLink} size={28} />
              )}
            </>
          </div>
          <div className="mt-5">
            <h3> {ad.title}</h3>
            <h3>{ad.address}</h3>
            <h5>{ad.description}</h5>
          </div>
          <div className="mt-5">
            <h3>{Intl.NumberFormat("en-US").format(ad?.price)} Bath</h3>
            <p className="d-flex justify-content-between mt-2 me-4">
              <span>Added {dayjs(ad?.createdAt).fromNow()}</span> <span>{ad?.views} Views</span>
            </p>
          </div>
        </div>
        <div className="col-lg-8"> {<ImageGallery items={getImages(ad?.photos)} />}</div>
      </div>
    </div>
  );
};

export default AdView;