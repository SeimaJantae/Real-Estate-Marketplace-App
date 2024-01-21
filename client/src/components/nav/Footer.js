import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center bg-body-tertiary fixed-bottom py-4">
      <h6>REMP - Real Estate Marketplace</h6>
      <small>&copy; {year} All rights reserved</small>
    </div>
  );
};

export default Footer;
