import React, { useState } from "react";
import axios from "axios";

function PopUpRateKPI({ closePopUp }) {
  const [custFocus, setCustFocus] = useState("");
  const [integrity, setIntegrity] = useState("");
  const [teamwork, setTeamwork] = useState("");
  const [cpoe, setCpoe] = useState("");
  const getName = localStorage.getItem("getName");
  const getMemberId = localStorage.getItem("getMemberId");
  const senderId = localStorage.getItem("getMemberId");

  const handleSubmit = async () => {
    try {
      const memberId = getMemberId;
      const now = new Date();
      const month = now.getMonth() + 1;
      var period = "Q1";

      if (month >= 1 && month <= 3) {
        period = "Q1";
      } else if (month >= 4 && month <= 6) {
        period = "Q2";
      } else if (month >= 7 && month <= 9) {
        period = "Q3";
      } else {
        period = "Q4";
      }

      await axios.put(`http://localhost:8080/api/pandora/ratemember`, null, {
        params: {
          senderId,
          memberId,
          period,
          custFocus,
          integrity,
          teamwork,
          cpoe,
        },
      });

      // If successful, you can close the popup or provide feedback
      closePopUp();
    } catch (error) {
      console.error("Failed to submit ratings:", error);
      alert("Failed to submit ratings. Please try again.");
    }
  };

  return (
    <div className="popup">
      <div className="font-16 font-semibold pb32 black-color">Rate KPI</div>

      <div className="label-input w100">
        <label htmlFor="custFocus">Cust Focus</label>
        <input
          type="text"
          name="custFocus"
          placeholder="Cust Focus"
          value={custFocus}
          onChange={(e) => setCustFocus(e.target.value)}
          required
        />
      </div>

      <div className="label-input w100">
        <label htmlFor="integrity">Integrity</label>
        <input
          type="text"
          name="integrity"
          placeholder="Integrity"
          value={integrity}
          onChange={(e) => setIntegrity(e.target.value)}
          required
        />
      </div>

      <div className="label-input w100">
        <label htmlFor="teamwork">Teamwork</label>
        <input
          type="text"
          name="teamwork"
          placeholder="Teamwork"
          value={teamwork}
          onChange={(e) => setTeamwork(e.target.value)}
          required
        />
      </div>

      <div className="label-input w100">
        <label htmlFor="cpoe">Cpoe</label>
        <input
          type="text"
          name="cpoe"
          placeholder="Cpoe"
          value={cpoe}
          onChange={(e) => setCpoe(e.target.value)}
          required
        />
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

export default PopUpRateKPI;
