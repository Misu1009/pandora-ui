import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PopUpEditUser from "./PopUpEditUser";

function PMOMasterUser() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

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
          `http://localhost:8080/api/pandora/pmo/getalluser?pmoId=${getPMOId}`
        );
        setUserData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getPMOId]);

  return (
    <>
      {isPopUpOpen && (
        <PopUpEditUser closePopUp={closePopUp} userId={selectedUserId} />
      )}
      <Navbar />
      <div className="content-all">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">Master User Application</div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th>Name</th>
                <th>Udomain</th>
                <th>Email</th>
                <th>Division</th>
                <th>Biro</th>
                <th>Pangkat</th>
                <th>Role</th>
                <th className="last-child">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.udomain}</td>
                  <td>{user.email}</td>
                  <td>{user.division}</td>
                  <td>{user.biro}</td>
                  <td>{user.eselonTier}</td>
                  <td>{user.role}</td>
                  <td>
                    <a className="no-deco" onClick={() => openPopUp(user.id)}>
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

export default PMOMasterUser;
