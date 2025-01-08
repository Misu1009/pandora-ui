import React from "react";

function Meesage({ message, isSuccess, onClose }) {
  return (
    <div className={`message-popup ${isSuccess ? "success" : "error"}`}>
      {message}
      <button onClick={onClose} style={{ marginLeft: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
        ✕
      </button>
    </div>
  );
}

export default Meesage;