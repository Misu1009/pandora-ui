import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "../../src/Stylist.css";
import axios from "axios";
import Logout from "../Auth/Logout";
import SmallPandoraLogo from "../Assets/SmallPandoraLogo.svg";

function NavHeader() {
  const getName = localStorage.getItem("getName");
  const getMemberId = localStorage.getItem("getMemberId");
  const productOwnerId = localStorage.getItem("productOwnerId");
  const getRole = localStorage.getItem("getRole");

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          
          <img src={SmallPandoraLogo} alt="error" />
        </div>

        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <div className="space-between-center dropdown arrow-down-up">
            <div className="font-14 black-color">{getName}</div>
            <i className="bx bx-chevron-down"></i>
            <Logout />
            <img
              src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg"
              alt="Profile"
              className="profile"
            />
          </div>
        </div>
      </nav>

      {/* sidebar */}
    </>
  );
}

export default NavHeader;
