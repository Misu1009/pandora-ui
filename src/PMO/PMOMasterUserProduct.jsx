import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PopUpEditProduct from "./PopUpEditProduct";
function PMOMasterUserProduct() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [userData, setUserData] = useState([]);
  const getPMOId = localStorage.getItem("pmoId");

  const openPopUp = () => {
    setIsPopUp(true);
  };

  const closePopUp = () => {
    setIsPopUp(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/getuserproduct?pmoId=${getPMOId}`
        );
        setUserData(response.data.userProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getPMOId]);

  return (
    <>
      {isPopUpOpen && <PopUpEditProduct closePopUp={closePopUp} />}

      <Navbar />
      <div className="content-all">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">Master User Product</div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th>Name</th>
                <th>Udomain</th>
                <th>ID Blueprint</th>
                <th className="last-child">Name Product</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((userproduct, index) => (
                <tr key={userproduct.id}>
                  <td>{index + 1}</td>
                  <td>{userproduct.name + 1}</td>
                  <td>{userproduct.udomain + 1}</td>
                  <td>{userproduct.idBluePrint + 1}</td>
                  <td>{userproduct.productName + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PMOMasterUserProduct;
