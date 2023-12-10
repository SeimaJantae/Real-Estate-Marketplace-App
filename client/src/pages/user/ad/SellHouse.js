import React from "react";
import SideBar from "../../../components/nav/SideBar";
import AdForm from "../../../components/forms/AdForm";

const SellHouse = () => {
  return (
    <div className="container-lg">
      <h5 className="pt-2">Sell House</h5>
      <SideBar></SideBar>
      <div className="contrainer-lg mt-2">
        <AdForm action="Sell" type="House" />
      </div>
    </div>
  );
};

export default SellHouse;
