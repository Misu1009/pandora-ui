import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

function PMOReportKPI() {
  const [memberData, setMemberData] = useState([]);
  const [message, setMessage] = useState("");
  const [productOwners, setProductOwners] = useState([]);
  const [productOwnerId, setProductOwnerId] = useState(
    localStorage.getItem("productOwnerId") || ""
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/productowner/getmemberkpis?productOwnerId=${productOwnerId}`
        );
        if (isMounted) {
          setMemberData(response.data.memberKPIDList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data. Please try again later.");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [productOwnerId]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/pandora/productowner/getmemberkpis?productOwnerId=${productOwnerId}`
  //     );

  //     if (isMounted) {
  //       const sortedData = response.data.memberKPIDList.map((member) => ({
  //         ...member,
  //         kquarters: member.kquarters.sort((a, b) => {
  //           const order = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
  //           return order[a.period] - order[b.period];
  //         }),
  //       }));

  //       setMemberData(sortedData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setMessage("Error fetching data. Please try again later.");
  //   }
  // };

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
      <div className="content-all">
        <Navbar />
        <div className="content-box-scroll">
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

          {message && <p className="error-message">{message}</p>}

          <table>
            <thead>
              <tr>
                <th rowSpan="2" className="first-child">
                  No
                </th>
                <th rowSpan="2">Domain</th>
                <th rowSpan="2">Name</th>
                <th rowSpan="2">Product</th>
                <th rowSpan="2">Role</th>
                <th rowSpan="2" className="border">
                  Quarter
                </th>
                <th colSpan="3" className="border">
                  Target Development
                </th>
                <th colSpan="5" className="border">
                  Individual Contribution Survey
                </th>
                <th colSpan="2" className="border">
                  Individual Commitment JIRA
                </th>
                <th rowSpan="2" className="border last-child">
                  KPI Product
                </th>
              </tr>
              <tr>
                <th className="border">Target</th>
                <th className="border">Done</th>
                <th className="border">Ach</th>
                <th className="border">Cust Focus</th>
                <th className="border">Integrity</th>
                <th className="border">Teamwork</th>
                <th className="border">CPOE</th>
                <th className="border">Average</th>
                <th className="border">On Schedule</th>
                <th className="border">Late</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member, memberIndex) => (
                <React.Fragment key={member.udomain}>
                  {member.kquarters.map((quarter, quarterIndex) => (
                    <tr key={member.udomain + quarterIndex}>
                      {quarterIndex === 0 && (
                        <>
                          <td
                            rowSpan={member.kquarters.length}
                            className={memberIndex % 2 === 0 ? "odd" : "even"}
                          >
                            {memberIndex + 1}
                          </td>
                          <td
                            rowSpan={member.kquarters.length}
                            className={memberIndex % 2 === 0 ? "odd" : "even"}
                          >
                            {member.udomain}
                          </td>
                          <td
                            rowSpan={member.kquarters.length}
                            className={memberIndex % 2 === 0 ? "odd" : "even"}
                          >
                            {member.name}
                          </td>
                          <td
                            rowSpan={member.kquarters.length}
                            className={memberIndex % 2 === 0 ? "odd" : "even"}
                          >
                            {member.productName}
                          </td>
                          <td
                            rowSpan={member.kquarters.length}
                            className={memberIndex % 2 === 0 ? "odd" : "even"}
                          >
                            {member.role}
                          </td>
                        </>
                      )}

                      <td>{quarter.period}</td>
                      <td>{quarter.target}</td>
                      <td>{quarter.done}</td>
                      <td>
                        {((quarter.done / quarter.target) * 100).toFixed(0)}%
                      </td>
                      <td>{quarter.custFocus}</td>
                      <td>{quarter.integrity}</td>
                      <td>{quarter.teamwork}</td>
                      <td>{quarter.cpoe}</td>
                      <td>
                        {(
                          (quarter.custFocus +
                            quarter.integrity +
                            quarter.teamwork +
                            quarter.cpoe) /
                          4
                        ).toFixed(2)}
                      </td>
                      <td>{quarter.onSchedule}</td>
                      <td>{quarter.late}</td>
                      {quarterIndex === 0 && (
                        <td
                          rowSpan={member.kquarters.length}
                          className={memberIndex % 2 === 0 ? "odd" : "even"}
                        >
                          {member.kpiProductSore}
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PMOReportKPI;
