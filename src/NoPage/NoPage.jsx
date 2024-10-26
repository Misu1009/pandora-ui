import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "../../src/Stylist.css";
import Nopage from "../Assets/NoPage.svg";
function NoPage() {
  const getRole = localStorage.getItem("getRole");
  return (
    <>
      <div className="card-no-page">
        <h1 className="font-100">404</h1>
        <p className="font-20 black-color pb12">
          Oops, we can not find the page you are looking for!
        </p>
        {getRole === "Product Owner" && (
          <a href="/po-main-page" className="btn-icon2 font-16 no-deco">
            Back To Main Page
          </a>
        )}
        {getRole === "PMO" && (
          <a href="/pmo-main-page" className="btn-icon2 font-16 no-deco">
            Back To Main Page
          </a>
        )}
        {getRole === "Member" && (
          <a href="/member-main-page" className="btn-icon2 font-16 no-deco">
            Back To Main Page
          </a>
        )}
      </div>
    </>
  );
}

export default NoPage;
