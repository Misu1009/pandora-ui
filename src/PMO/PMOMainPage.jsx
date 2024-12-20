import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";

function PMOMainPage() {
  const [message, setMessage] = useState("");
  const pmoId = localStorage.getItem("pmoId");

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pandora/pmo/synchronize?pmoId=${pmoId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setMessage("Synchronize successfully.");
        window.location.href = "/pmo-main-page";
      }
    } catch (error) {
      setMessage("Error Synchronize. Please try again later.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="wallet3D">
          <img src={MainWalletLogo} alt="error" />
        </div>
        <form className="auth" onSubmit={""}>
          <img
            className="pb12"
            src={PandoraLogo}
            alt="error"
            height={42}
            width={213}
          />
          <div className="font-14 font-regular pb12 black-color-50">
            Hello, Kevin Wijaya!
          </div>
          <div className="font-16 font-medium pb32 black-color">
            Where Do you Want to Go?
          </div>

          <div className="pb24">
            <a className="btn-icon w100" href={"/pmo-report-product"}>
              <i className="bx bx-cube font-24 pr12"></i>
              <div className="font-16 font-medium">Report Product</div>
            </a>
          </div>
          <div className="pb24">
            <a className="btn-icon w100 pb24" href={"/pmo-report-member"}>
              <i className="bx bx-group font-24 pr12"></i>
              <div className="font-16 font-medium">Report Member</div>
            </a>
          </div>
          <div className="pb32">
            <a className="btn-icon w100 pb24" href={"/pmo-report-kpi"}>
              <i className="bx bx-network-chart font-24 pr12"></i>
              <div className="font-16 font-medium">Report KPI</div>
            </a>
          </div>
          <div className="pb24">
            <a className="btn-icon w100" href={"/pmo-master-user"}>
              <i className="bx bx-user font-24 pr12"></i>
              <div className="font-16 font-medium">Master User</div>
            </a>
          </div>
          <div className="pb24">
            <a className="btn-icon w100 pb24" href={"/pmo-master-product"}>
              <i className="bx bx-package font-24 pr12"></i>
              <div className="font-16 font-medium">Master Product</div>
            </a>
          </div>
          <div className="pb32">
            <a className="btn-icon w100 pb24" href={"/pmo-master-user-product"}>
              <i className="bx bxs-component font-24 pr12"></i>
              <div className="font-16 font-medium">Master User Product</div>
            </a>
          </div>
          <div className="label-input space-center">
            <div className="font-14 font-semibold color-black">
              Synchronize data?
            </div>
            <a
              className="font-14 font-semibold blue-color no-deco"
              onClick={handleEdit}
            >
              Refresh
            </a>
          </div>
          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default PMOMainPage;
