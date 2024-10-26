import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PopUpEditProduct from "./PopUpEditProduct";
function PMOMasterProduct() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track the selected user

  const getPMOId = localStorage.getItem("pmoId");

  const openPopUp = (userId) => {
    setSelectedUserId(userId);
    setIsPopUp(true);
  };

  const closePopUp = () => {
    setIsPopUp(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/pmo/getallproduct?pmoId=${getPMOId}`
        );
        setUserData(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getPMOId]);

  return (
    <>
      {isPopUpOpen && (
        <PopUpEditProduct closePopUp={closePopUp} productId={selectedUserId} />
      )}

      <Navbar />
      <div className="content-all">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">Master Product</div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th>ID Blueprint</th>
                <th>Name</th>
                <th>Mico</th>
                <th>Product Owner Name</th>
                <th className="last-child">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.idBlueprint}</td>
                  <td>{product.name}</td>
                  <td>{product.mico}</td>
                  <td>{product.productOwnerName}</td>
                  <td>
                    <a
                      className="no-deco"
                      onClick={() => openPopUp(product.id)}
                    >
                      <i className="bx bxs-pencil yellow-color f24"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PMOMasterProduct;
