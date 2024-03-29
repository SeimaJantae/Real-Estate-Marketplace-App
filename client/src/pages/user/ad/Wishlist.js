import React from "react";
import SideBar from "../../../components/nav/SideBar";
import { useAuth } from "../../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import AdCard from "../../../components/cards/AdCard";

const Wishlist = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const fetchAds = async (req, res) => {
    try {
      const { data } = await axios.get("/wishlist-ads");
      console.log(data.ads);
      setAds(data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  return (
    <div className="container-lg">
      <SideBar></SideBar>
      <h5 className="pt-2">Wishlist</h5>
      {!ads?.length ? (
        <>
          <div className="d-flex justify-content-center align-item-center vh-100">
            <p> You have not liked any ads yet, {auth.user?.name ? auth.user?.name : auth.user?.username}</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <p>You have liked {ads?.length} ads</p>
          </div>
          <div className="row">
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
