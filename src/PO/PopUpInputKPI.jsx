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

      if (response.ok) {
        setMessage("KPI Product Score updated successfully.");
        window.location.href = "/po-report-product";
        closePopUp();
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error editing KPI score:", error);
      setMessage("Error editing KPI score. Please try again later.");
    }
  };

  const handleSubmit = () => {
    if (score.trim() === "") {
      setMessage("Please enter a valid score.");
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
          type="text"
          name="score"
          placeholder="Enter Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
      </div>
      {message && <p className="font-16 red-color text-center">{message}</p>}
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
