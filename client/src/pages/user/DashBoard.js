import React from "react";
import SideBar from "../../components/nav/SideBar";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";

const DashBoard = () => {
  // context
  const [auth, setAuth] = useAuth();
  const seller = auth.user?.role?.includes("Seller");
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchAds = async (req, res) => {
    try {
      const { data } = await axios.get("/user-ads");
      setAds(data.ads);
      setTotal(data.total);
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
      <h5 className="pt-2">Dashboard</h5>
      {!seller ? (
        <>
          <div className="d-flex justify-content-center align-item-center vh-100">
            <h5> Welcome REMP app, {auth.user?.name ? auth.user?.name : auth.user?.username}</h5>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <p>Total {total} ads found</p>
          </div>
          <div className="row">
            {ads?.map((ad) => (
              <UserAdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
