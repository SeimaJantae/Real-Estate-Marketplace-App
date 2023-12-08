import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashBoard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/ad/create">
            Create Ad
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
