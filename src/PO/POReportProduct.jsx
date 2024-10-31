import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import PopUpInputKPI from "./PopUpInputKPI";
import axios from "axios";

function POReportProduct() {
  const [productData, setProductData] = useState(null); // Initialize with null
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [message, setMessage] = useState("");

  const productOwnerId = localStorage.getItem("productOwnerId");

  var totalTarget = productData?.pquarters.reduce(
    (acc, quarter) => acc + (quarter.target || 0),
    0
  );
  var totalDone = productData?.pquarters.reduce(
    (acc, quarter) => acc + (quarter.done || 0),
    0
  );

  const openPopUp = () => {
    setIsPopUp(true);
  };

  const closePopUp = () => {
    setIsPopUp(false);
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pandora/productowner/getproducts?productOwnerId=${productOwnerId}`
      );
      setProductData(response.data); // Set the response data to state
    } catch (error) {
      console.error("Error fetching product data:", error);
      setMessage("Error fetching product data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProductData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <div className="content-all">
        {isPopUpOpen && <PopUpInputKPI closePopUp={closePopUp} />}
        <Navbar />
        <div className="content-box">
          <div className="content-row content-box-scroll-x">
            <div className="chart-row">
              <div className="space-between-start w100">
                <div className="chart-icon bg-blue h100">
                  <div className="h100">
                    <i className="bx bxs-buildings h100"></i>
                  </div>
                </div>
                <div className="chart-left">
                  <div className="font-24 font-bold">
                    {productData?.product.name}
                  </div>
                  <div className="space-between-start w100">
                    <div className="font-16 font-medium black-color-50">
                      {productData?.product.mico}
                    </div>
                    <div className="font-16 font-medium black-color-50">
                      {productData?.product.idBluePrint}
                    </div>
                  </div>
                  <div className="space-between-center dark-blue-color">
                    <i className="bx bxs-user blue-dark-color"></i>
                    <div className="font-16 font-regular blue-dark-color">
                      {productData?.productOwnerName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-between-start w100">
                <div className="chart-score bg-yellow">
                  <i class="bx bx-category font-24"></i>
                  <div className="font-12 font-bold">Total Feature</div>
                  <div className="font-24 font-bold">
                    {productData?.totalFeature}
                  </div>
                </div>
                <div className="chart-score bg-orange">
                  <i class="bx bx-collection font-24"></i>
                  <div className="font-12 font-bold">Total Subtask</div>
                  <div className="font-24 font-bold">
                    {productData?.totalSubtask}
                  </div>
                </div>
              </div>
              <div className="chart-score bg-green">
                <i className="bx bx-network-chart"></i>
                <div className="font-12 font-bold">KPI Score</div>
                <div className="font-24 font-bold">{productData?.kpiScore}</div>
              </div>
            </div>
            <div className="chart-graph w100 h100">
              <div className="chart-graph w100 h50">
                Feature Submitted
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: totalTarget,
                          label: "Target",
                          className: "bg-blue",
                        },
                        {
                          id: 1,
                          value: totalDone,
                          label: "Done",
                          className: "bg-yellow",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={100}
                />
              </div>
              <div className="chart-graph w100 h50">
                Quarter Progress 2023
                <BarChart
                  xAxis={[
                    { scaleType: "band", data: ["Q1", "Q2", "Q3", "Q4"] },
                  ]}
                  series={[
                    {
                      data: ["Q1", "Q2", "Q3", "Q4"].map(
                        (quarter) =>
                          productData?.pquarters.find(
                            (q) => q.period === quarter
                          )?.target || 0
                      ),
                      className: "bg-blue",
                    },
                    {
                      data: ["Q1", "Q2", "Q3", "Q4"].map(
                        (quarter) =>
                          productData?.pquarters.find(
                            (q) => q.period === quarter
                          )?.done || 0
                      ),
                      className: "bg-yellow",
                    },
                  ]}
                  width={400}
                  height={150}
                />
              </div>
            </div>
            <div className="chart-graph w100 h100">
              Feature Submitted
              <BarChart
                xAxis={[
                  { scaleType: "band", data: ["Q1"], categoryGapRatio: 0.7 },
                ]}
                series={[
                  { data: [productData?.totalFeature], className: "bg-blue" },
                ]}
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="content-box ">
          <div className="space-between-start">
            <div className="card-title">Dashboard Product</div>
            <div className="space-between-center">
              <a className="small-btn-blue" onClick={openPopUp}>
                <div className="font-14 font-medium pr12">
                  Input KPI Product Score
                </div>
                <i className="bx bx-plus font-16 rotate-180"></i>
              </a>
              <a
                className="small-btn-blue"
                href={`http://localhost:8080/api/pandora/productowner/downloadproduct?productOwnerId=${productOwnerId}`}
              >
                <div className="font-14 font-medium pr12">Excel</div>
                <i className="bx bxs-to-top font-16 rotate-180"></i>
              </a>
            </div>
          </div>
          <div className="content-box-scroll-x">
            <table>
              <thead>
                <tr>
                  <th className="first-child">No</th>
                  <th>Feature ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Strategic Topic</th>
                  <th className="text-center">Start Date</th>
                  <th className="text-center last-child">End Date</th>
                </tr>
              </thead>
              <tbody>
                {productData?.features.map((feature, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{feature.featureId}</td>
                    <td>{feature.name}</td>
                    <td>{feature.status}</td>
                    <td>{feature.strategicTopic}</td>
                    <td className="text-center">
                      {new Date(feature.startDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(feature.endDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default POReportProduct;
