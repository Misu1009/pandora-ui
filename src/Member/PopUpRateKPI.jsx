import React, { useState } from "react";
import axios from "axios";

function PopUpRateKPI({ closePopUp, setMessage, userId }) {
  const [custFocus, setCustFocus] = useState("");
  const [integrity, setIntegrity] = useState("");
  const [teamwork, setTeamwork] = useState("");
  const [cpoe, setCpoe] = useState("");
  const [errors, setErrors] = useState({});

  const senderId = localStorage.getItem("getMemberId");

  const validateFields = () => {
    const validationErrors = {};
    if (!custFocus) validationErrors.custFocus = "Customer Focus is required.";
    if (!integrity) validationErrors.integrity = "Integrity is required.";
    if (!teamwork) validationErrors.teamwork = "Teamwork is required.";
    if (!cpoe) validationErrors.cpoe = "CPOE is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const period = month <= 3 ? "Q1" : month <= 6 ? "Q2" : month <= 9 ? "Q3" : "Q4";

      const response = await axios.put(
        `http://localhost:8080/api/pandora/ratemember`,
        null,
        {
          params: { senderId, memberId: userId, period, custFocus, integrity, teamwork, cpoe },
        }
      );


      const validationErrors = {};
      if (!integrity) validationErrors.name = "Integrity is required.";
      if (!teamwork) validationErrors.division = "Teamwork is required.";
      if (!cpoe) validationErrors.biro = "Cpoe is required.";
      if (!custFocus) validationErrors.pangkat = "Cust Focus is required.";

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
  
      if (response.data === true) {
        setMessage("Data Updated Successfully");
        alert("Success: Rating has been submitted!");
        closePopUp();
      } else if (response.data === false) {
        alert("Failed to submit ratings. More than 1 attempt.");
        closePopUp();
      } else {
        alert("Failed to Update Data");
      }
      

      
    } catch (error) {
      console.error("Failed to submit ratings:", error);
      setMessage("Failed to submit ratings. Please try again.");
    }
  };

  return (
    <div className="popup">
      <div className="font-16 font-semibold pb32 black-color">Rate KPI</div>

      <div className="label-input w100">
        <label htmlFor="custFocus">Customer Focus</label>
        <input
          type="number"
          name="custFocus"
          placeholder="Enter Rating (1-4)"
          value={custFocus}
          onChange={(e) => setCustFocus(e.target.value)}
          required
        />
        {errors.custFocus && <div className="error-message">{errors.custFocus}</div>}
      </div>

      <div className="label-input w100">
        <label htmlFor="integrity">Integrity</label>
        <input
          type="number"
          name="integrity"
          placeholder="Enter Rating (1-4)"
          value={integrity}
          onChange={(e) => setIntegrity(e.target.value)}
          required
        />
        {errors.integrity && <div className="error-message">{errors.integrity}</div>}
      </div>

      <div className="label-input w100">
        <label htmlFor="teamwork">Teamwork</label>
        <input
          type="number"
          name="teamwork"
          placeholder="Enter Rating (1-4)"
          value={teamwork}
          onChange={(e) => setTeamwork(e.target.value)}
          required
        />
        {errors.teamwork && <div className="error-message">{errors.teamwork}</div>}
      </div>

      <div className="label-input w100">
        <label htmlFor="cpoe">Commitment to Process Excellence (CPOE)</label>
        <input
          type="number"
          name="cpoe"
          placeholder="Enter Rating (1-4)"
          value={cpoe}
          onChange={(e) => setCpoe(e.target.value)}
          required
        />
        {errors.cpoe && <div className="error-message">{errors.cpoe}</div>}
      </div>

      <div className="space-between-center gap-button">
        <button className="btn-red" onClick={closePopUp}>
          Cancel
        </button>
        <button className="btn-blue" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PopUpRateKPI;
