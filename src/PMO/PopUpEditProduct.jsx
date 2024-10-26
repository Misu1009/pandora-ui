import React, { useState } from "react";

function PopUpEditProduct({ closePopUp, productId }) {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [mico, setMico] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pandora/product/edit?productId=${productId}&name=${name}&mico=${mico}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setMessage("Product information updated successfully.");
        closePopUp();
        window.location.href = "/pmo-master-product";
      } else {
        const data = await response.json();
        setMessage(data.message || "Error updating product information.");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      setMessage("Error editing product. Please try again later.");
    }
  };
  return (
    <div className="popup">
      <div className="font-16 font-semibold pb32 black-color">
        Edit User Application
      </div>
      <div className="label-input w100">
        <label htmlFor="nilai1">Nama</label>
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
        <label htmlFor="nilai1">Mico</label>
        <input
          type="text"
          name="mico"
          placeholder="Mico"
          value={mico}
          onChange={(e) => setMico(e.target.value)}
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

export default PopUpEditProduct;
