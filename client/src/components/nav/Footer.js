import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="sticky-bottom text-center bg-body-tertiary py-4">
      <h6>REMP - Real Estate Marketplace</h6>
      <small>&copy; {year} All rights reserved</small>
    </div>
  );
};

export default Footer;
