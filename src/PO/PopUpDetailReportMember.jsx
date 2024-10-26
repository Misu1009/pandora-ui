import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function PopUpDetailReportMember({
  closePopUp,
  subtasks,
  totalFeature,
  totalSubtask,
}) {
  return (
    <div className="popup-big">
      <div className="popup-content">
        <div className="chart-graph w100 h50">
          <div className="w100 right">
            <div className="btn-red-custom" onClick={closePopUp}>
              Cancel
            </div>
          </div>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Subtasks"],
                categoryGapRatio: 0.2,
                barGapRatio: 0.5,
              },
            ]}
            series={[
              {
                data: [totalFeature],
                className: "bg-blue",
                label: "Feature Submitted         ",
              },
              {
                data: [totalSubtask],
                className: "bg-yellow",
                label: "Subtask Involved",
              },
            ]}
            categoryGapRatio={0.5}
            width={700}
            height={200}
          />
        </div>
        <div className="space-between-start">
          <div className="card-title">Dashboard Members</div>
        </div>
        <table className="table-box">
          <thead>
            <tr>
              <th className="first-child">No</th>
              <th>Code</th>
              <th>Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th className="last-child">End Date</th>
            </tr>
          </thead>
          <tbody>
            {subtasks.map((subtask, index) => (
              <tr key={subtask.code}>
                <td>{index + 1}</td>
                <td>{subtask.code}</td>
                <td>{subtask.name}</td>
                <td>{subtask.status}</td>
                <td>{new Date(subtask.startDate).toLocaleDateString()}</td>
                <td>{new Date(subtask.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopUpDetailReportMember;
