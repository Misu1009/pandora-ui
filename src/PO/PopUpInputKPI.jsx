import React, { useState } from "react";

function PopUpInputKPI({ closePopUp }) {
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  const productOwnerId = localStorage.getItem("productOwnerId");

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pandora/productowner/setkpiproductscore?productOwnerId=${productOwnerId}&score=${score}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data === true) {
        alert("KPI Product Score updated successfully.");
        window.location.href = "/po-report-product";
        closePopUp();
      } else if (data === false) {
        alert("KPI updates are allowed only in Q4");
        window.location.href = "/po-report-product";
      }
    } catch (error) {
      console.error("Error editing KPI score:", error);
      alert("Error editing KPI score. Please try again later.");
    }
  };

  const handleSubmit = () => {
    // Trim and validate the input
    if (score.trim() === "") {
      setMessage("Please enter a valid score.");
      return;
    }

    // Check if the score is a valid float
    const isFloat = /^[+-]?([0-9]*[.])?[0-9]+$/.test(score);
    if (!isFloat) {
      setMessage("Please enter a float number.");
      return;
    }

    handleEdit();
  };

  return (
    <div className="popup">
      <div className="font-16 font-semibold pb32 black-color">
        Input KPI Product Score
      </div>
      <div className="label-input w100">
        <label htmlFor="score">Score</label>
        <input
          type="number"
          name="score"
          placeholder="Enter Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        {message && <p className="error-message">{message}</p>}
      </div>

      <div className="space-between-center gap-button">
        <div className="btn-red" onClick={closePopUp}>
          Cancel
        </div>
        <div className="btn-blue" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default PopUpInputKPI;
