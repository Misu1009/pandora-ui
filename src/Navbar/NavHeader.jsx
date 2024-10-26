import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "../../src/Stylist.css";
import ProfileImage from "../Assets/profile.jpg";
import axios from "axios";
import Logout from "../Auth/Logout";
import SmallPandoraLogo from "../Assets/SmallPandoraLogo.svg";

function NavHeader() {
  const getName = localStorage.getItem("getName");
  const getMemberId = localStorage.getItem("getMemberId");
  const productOwnerId = localStorage.getItem("productOwnerId");
  const getRole = localStorage.getItem("getRole");

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    const sidebarExpand = document.querySelector(".expand_sidebar");

    const handleSidebarOpen = () => sidebar.classList.toggle("close");
    const handleSidebarClose = () => {
      sidebar.classList.add("close", "hoverable");
      const adminArea = document.querySelector(".content-all");
      if (adminArea) {
        adminArea.style.margin = "95px 50px 50px 80px";
      }
    };

    const handleSidebarExpand = () => {
      sidebar.classList.remove("close", "hoverable");
      const adminArea = document.querySelector(".content-all");
      if (adminArea) {
        adminArea.style.margin = "95px 50px 50px 260px";
      }
    };

    const handleMouseEnter = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    };

    const handleMouseLeave = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    };

    sidebarOpen?.addEventListener("click", handleSidebarOpen);
    sidebarClose?.addEventListener("click", handleSidebarClose);
    sidebarExpand?.addEventListener("click", handleSidebarExpand);
    sidebar?.addEventListener("mouseenter", handleMouseEnter);
    sidebar?.addEventListener("mouseleave", handleMouseLeave);

    // Proper cleanup to avoid errors on component unmount
    return () => {
      sidebarOpen?.removeEventListener("click", handleSidebarOpen);
      sidebarClose?.removeEventListener("click", handleSidebarClose);
      sidebarExpand?.removeEventListener("click", handleSidebarExpand);
      sidebar?.removeEventListener("mouseenter", handleMouseEnter);
      sidebar?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <i className="bx bx-menu" id="sidebarOpen"></i>
          <img src={SmallPandoraLogo} alt="error" />
        </div>

        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <div className="space-between-center dropdown arrow-down-up">
            <div className="font-14 black-color">{getName}</div>
            <i className="bx bx-chevron-down"></i>
            <Logout />
            <img src={ProfileImage} alt="" className="profile" />
          </div>
        </div>
      </nav>

      {/* sidebar */}
    </>
  );
}

export default NavHeader;
