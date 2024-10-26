import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PopUpDetailReportMember from "../PO/PopUpDetailReportMember";

function PMOReportMember() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [productOwners, setProductOwners] = useState([]);
  const [selectedMemberSubtasks, setSelectedMemberSubtasks] = useState([]);
  const [selectedMemberFeature, setSelectedMemberFeature] = useState(0);
  const [selectedMemberSubtaskCount, setSelectedMemberSubtaskCount] =
    useState(0);
  const [productOwnerId, setProductOwnerId] = useState(
    localStorage.getItem("productOwnerId") || ""
  );

  const openPopUp = (subtasks, totalFeature, totalSubtask) => {
    setSelectedMemberSubtasks(subtasks);
    setSelectedMemberFeature(totalFeature);
    setSelectedMemberSubtaskCount(totalSubtask);
    setIsPopUp(true);
  };

  const closePopUp = () => {
    setIsPopUp(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/productowner/getmembers?productOwnerId=${productOwnerId}`
        );
        if (isMounted) {
          setMemberData(response.data.members);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [productOwnerId]);

  useEffect(() => {
    const fetchProductOwners = async () => {
      try {
        const productOwnerResponse = await axios.get(
          "http://localhost:8080/api/pandora/productowner/getAll"
        );
        setProductOwners(productOwnerResponse.data.productOwners);
      } catch (error) {
        console.error("Error fetching product owners:", error);
      }
    };

    fetchProductOwners();
  }, []);

  // Handle product owner dropdown
  const handleProductOwnerChange = (e) => {
    const selectedProductOwnerId = e.target.value;
    setProductOwnerId(selectedProductOwnerId);
    localStorage.setItem("productOwnerId", selectedProductOwnerId);
  };

  return (
    <>
      {isPopUpOpen && (
        <PopUpDetailReportMember
          closePopUp={closePopUp}
          subtasks={selectedMemberSubtasks}
          totalFeature={selectedMemberFeature}
          totalSubtask={selectedMemberSubtaskCount}
        />
      )}

      <Navbar />
      <div className="content-all">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">Dashboard Members</div>
            <div className="space-between-center">
              <div className="card-label-filter pr12">List Product Owner</div>
              <select
                className="filter"
                value={productOwnerId}
                onChange={handleProductOwnerChange}
              >
                {productOwners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th>Name</th>
                <th>Division</th>
                <th>Email</th>
                <th className="last-child">Action</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member, index) => (
                <tr key={member.email}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.division}</td>
                  <td>{member.email}</td>
                  <td>
                    <a
                      href="#"
                      className="btn-white no-deco"
                      onClick={() =>
                        openPopUp(
                          member.subtasks,
                          member.totalFeature,
                          member.totalSubtask
                        )
                      }
                    >
                      details
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

export default PMOReportMember;
