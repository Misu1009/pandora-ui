import React, { useState } from "react";

function PopUpEditProduct({ closePopUp, productId }) {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [mico, setMico] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleEdit = async () => {

    const validationErrors = {};
    if (!name) validationErrors.name = "name is required.";
    if (!mico) validationErrors.mico = "mico is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

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
        Edit Product
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
        {errors.name && <div className="error-message">{errors.name}</div>}
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
        {errors.mico && <div className="error-message">{errors.mico}</div>}
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
