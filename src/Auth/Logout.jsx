import React from "react";

function Logout() {
  const handleLogout = () => {
    // Hapus item isLoggedIn dari localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("getUsername");
    localStorage.removeItem("getPassword");
    localStorage.removeItem("getUserId");
  };

  return (
    <div className="dropdown-logout">
      <a className="font-12 black-color" onClick={handleLogout} href="/login">
        Logout
      </a>
    </div>
  );
}

export default Logout;
