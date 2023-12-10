import React from "react";
import SideBar from "../../../components/nav/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdCreate = () => {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setRent(true);
    setSell(false);
  };

  return (
    <div className="container-lg">
      <h5 className="pt-2">Ad Create</h5>
      <SideBar></SideBar>
      <div className="d-flex justify-content-center align-items-satrt vh-100 mt-4">
        <div className="col-lg-6">
          <button onClick={handleSell} type="button" class="btn btn-outline-primary btn-lg col-12 p-5">
            Sell
          </button>
          {sell && (
            <div className="d-flex">
              <button
                onClick={() => navigate("/ad/create/sell/house")}
                type="button"
                class="btn btn-outline-primary col-6 p-5"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/land")}
                type="button"
                class="btn btn-outline-primary col-6 p-5"
              >
                Land
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <button onClick={handleRent} type="button" class="btn btn-outline-primary btn-lg col-12 p-5">
            Rent
          </button>
          {rent && (
            <div className="d-flex">
              <button
                onClick={() => navigate("/ad/create/rent/house")}
                type="button"
                class="btn btn-outline-primary col-6 p-5"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/land")}
                type="button"
                class="btn btn-outline-primary col-6 p-5"
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCreate;
