import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pandora/login?email=${email}&password=${password}`
      );
      const userData = response.data;

      if (userData.id === 0) {
        setErrorMessage(
          "Login failed. User not found or credentials are incorrect."
        );
        return;
      }

      // Store login data to localStorage
      localStorage.setItem("getName", userData.name);
      localStorage.setItem("getMemberId", userData.id);
      localStorage.setItem("getRole", userData.role);
      localStorage.setItem("isLoggedIn", true);

      if (userData.role === "Product Owner") {
        // Fetch the product owners list
        // keep kayaknya gak perlu narik dari api ini sih
        const productOwnerResponse = await axios.get(
          "http://localhost:8080/api/pandora/productowner/getAll"
        );
        const productOwners = productOwnerResponse.data.productOwners;

        const matchingProductOwner = productOwners.find(
          (owner) => owner.name === userData.name
        );

        localStorage.setItem("productOwnerId", matchingProductOwner.id);

        window.location.href = "/po-main-page";
      } else if (userData.role === "PMO") {
        localStorage.setItem("pmoId", userData.id);
        window.location.href = "/pmo-main-page";
      } else if (userData.role === "Member") {
        window.location.href = "/member-main-page";
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="wallet3D">
          <img src={MainWalletLogo} alt="error" />
        </div>
        <form className="auth" onSubmit={handleLogin}>
          <img
            className="pb12"
            src={PandoraLogo}
            alt="error"
            height={42}
            width={213}
          />
          <div className="font-16 font-regular pb32 black-color">
            Login To Your Account
          </div>

          {/* Tampilkan pesan error jika ada */}
          {errorMessage && (
            <div className="error-message red-color">{errorMessage}</div>
          )}

          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input black-color">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pb12">
            <button type="submit" className="btn-blue font-14 w100">
              Login
            </button>
          </div>
          <div className="label-input space-center">
            <div className="font-14 font-semibold color-black">
              Don't have an account?
            </div>
            <a
              className="font-14 font-semibold blue-color no-deco"
              href="/register"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
