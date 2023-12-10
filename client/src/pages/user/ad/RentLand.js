import React from "react";
import SideBar from "../../../components/nav/SideBar";
import AdForm from "../../../components/forms/AdForm";

const RentLand = () => {
  return (
    <div className="container-lg">
      <h5 className="pt-2">Rent Land</h5>
      <SideBar></SideBar>
      <div className="contrainer-lg mt-2">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
};

export default RentLand;
