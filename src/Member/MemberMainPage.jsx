import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";
import axios from "axios";
import NavHeader from "../Navbar/NavHeader";
import PopUpRateKPI from "./PopUpRateKPI";

function MemberMainPage() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [MemberData, setMemberData] = useState([]);
  const getMemberId = localStorage.getItem("getMemberId");

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
          `http://localhost:8080/api/pandora/getothermember?memberId=${getMemberId}`
        );
        setMemberData(response.data.otherMembers); // Access members array directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isPopUpOpen && (
        <PopUpRateKPI closePopUp={closePopUp} userId={selectedUserId} />
      )}
      {/* content-member */}
      <NavHeader />
      <div className="content-member">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">List Member</div>

            <div className="space-between-center"></div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th className="w100">Name</th>
                <th className="last-child">Rate</th>
              </tr>
            </thead>
            <tbody>
              {MemberData && MemberData.length > 0 ? (
                MemberData.map((member, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>
                      <a
                        href="#"
                        className="btn-white no-deco"
                        onClick={() => openPopUp(member.id)}
                      >
                        rate
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No members found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MemberMainPage;
