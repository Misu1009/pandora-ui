import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "../../src/Stylist.css";
import ProfileImage from "../Assets/profile.jpg";
import axios from "axios";
import Logout from "../Auth/Logout";
import SmallPandoraLogo from "../Assets/SmallPandoraLogo.svg";

function Navbar() {
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

          {getRole === "Product Owner" && (
            <a href="/po-main-page">
              <img src={SmallPandoraLogo} alt="error" />
            </a>
          )}
          {getRole === "PMO" && (
            <a href="/pmo-main-page">
              <img src={SmallPandoraLogo} alt="error" />
            </a>
          )}
          {getRole === "Member" && (
            <a href="/member-main-page">
              <img src={SmallPandoraLogo} alt="error" />
            </a>
          )}
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
      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <div className="menu_title menu_editor"></div>
            {getRole === "Product Owner" && (
              <>
                <li className="item">
                  <a href="/po-report-product" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-cube"></i>
                    </span>
                    <span className="navlink">Report Product</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/po-report-member" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-group"></i>
                    </span>
                    <span className="navlink">Report Member</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/po-report-kpi" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-network-chart"></i>
                    </span>
                    <span className="navlink">Report KPI</span>
                  </a>
                </li>
              </>
            )}
            {getRole === "PMO" && (
              <>
                <li className="item">
                  <span className="navlink font-20 blue-color font-semibold pl24">
                    Report
                  </span>
                </li>
                <li className="item">
                  <a href="/pmo-report-product" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-cube"></i>
                    </span>
                    <span className="navlink">Product</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/pmo-report-member" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-group"></i>
                    </span>
                    <span className="navlink">Member</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/pmo-report-kpi" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-network-chart"></i>
                    </span>
                    <span className="navlink">KPI</span>
                  </a>
                </li>
                <li className="item">
                  <span className="navlink font-20 blue-color font-semibold pl24">
                    Master
                  </span>
                </li>
                <li className="item">
                  <a href="/pmo-master-user" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-user"></i>
                    </span>
                    <span className="navlink">User</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/pmo-master-product" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bx-package"></i>
                    </span>
                    <span className="navlink">Product</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/pmo-master-user-product" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-component"></i>
                    </span>
                    <span className="navlink">User Product</span>
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* Sidebar Open / Close */}
          <div className="bottom_content">
            <div className="bottom expand_sidebar">
              <span> Expand</span>
              <i className="bx bx-log-in"></i>
            </div>
            <div className="bottom collapse_sidebar">
              <span> Collapse</span>
              <i className="bx bx-log-out"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
