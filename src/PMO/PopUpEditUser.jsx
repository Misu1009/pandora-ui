import React, { useState } from "react";

function PopUpEditUser({ closePopUp, userId }) {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [biro, setBiro] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pandora/edit?userId=${userId}&name=${name}&division=${division}&biro=${biro}&eselonTier=${pangkat}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setMessage("User information updated successfully.");
        closePopUp();
        window.location.href = "/pmo-master-user";
      } else {
        const data = await response.json();
        setMessage(data.message || "Error updating user information.");
      }
    } catch (error) {
      console.error("Error editing user:", error);
      setMessage("Error editing user. Please try again later.");
    }
  };

  return (
    <div className="popup">
      <div className="font-16 font-semibold pb32 black-color">
        Edit User Application
      </div>
      <div className="label-input w100">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="label-input w100">
        <label htmlFor="division">Division</label>
        <input
          type="text"
          name="division"
          placeholder="Division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          required
        />
      </div>
      <div className="label-input w100">
        <label htmlFor="biro">Biro</label>
        <input
          type="text"
          name="biro"
          placeholder="Biro"
          value={biro}
          onChange={(e) => setBiro(e.target.value)}
          required
        />
      </div>
      <div className="label-input w100">
        <label htmlFor="pangkat">Pangkat</label>
        <input
          type="text"
          name="pangkat"
          placeholder="Pangkat"
          value={pangkat}
          onChange={(e) => setPangkat(e.target.value)}
          required
        />
      </div>
      <div className="space-between-center gap-button">
        <div className="btn-red" onClick={closePopUp}>
          Cancel
        </div>
        <div className="btn-blue" onClick={handleEdit}>
          Submit
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default PopUpEditUser;
