import React, { useState, useEffect } from "react";
import PandoraLogo from "../Assets/PandoraLogo.svg";
import MainWalletLogo from "../Assets/MainWalletLogo.svg";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [productOwnerId, setProductOwnerId] = useState("");
  const [productOwners, setProductOwners] = useState([]); // Store product owners
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(""); // Email validation error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(email)) {
      setEmailError("Email must end with @xyz.com");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/pandora/member/register?name=${name}&email=${email}&password=${password}&productOwnerId=${productOwnerId}`
      );
      const userData = response.data;
      localStorage.setItem("getName", userData.name);
      localStorage.setItem("getProductOwnerId", userData.productOwnerId);
      localStorage.setItem("isLoggedIn", true);

      window.location.href = "/login";
    } catch (error) {
      setMessage(
        `Failed Registration: ${error.response?.data?.message || error.message}`
      );
      console.error("Failed Registration:", error);
      alert(error.message);
    }
  };

  const validateEmail = (email) => {
    // Check if email ends with @xyz.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@xyz\.com$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    const fetchProductOwners = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/productowner/getAll`
        );
        setProductOwners(response.data.productOwners);
      } catch (error) {
        console.error("Error fetching product owners:", error);
      }
    };

    fetchProductOwners();
  }, []);

  return (
    <div className="container">
      <div className="wallet3D">
        <img src={MainWalletLogo} alt="error" />
      </div>
      <form className="auth" onSubmit={handleSubmit}>
        <img
          className="pb12"
          src={PandoraLogo}
          alt="error"
          height={42}
          width={213}
        />
        <div className="font-16 font-regular pb32 black-color">
          Register New Account
        </div>
        <div className="label-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@xyz.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(""); // Clear error message on input change
            }}
            required
          />
          {emailError && (
            <div className="error-message font-12 red-color">{emailError}</div>
          )}
        </div>
        <div className="label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="label-input w100">
          <label htmlFor="productOwnerId">List Product Owner</label>
          <select
            className="w100"
            id="productOwnerId"
            value={productOwnerId}
            onChange={(e) => setProductOwnerId(e.target.value)} // update state
            required
          >
            <option value="" disabled>
              Select Product Owner
            </option>
            {productOwners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
        </div>

        {message && <p className="font-12 red-color text-center">{message}</p>}

        <div className="pb12">
          <button type="submit" className="btn-blue font-14 w100">
            Register
          </button>
        </div>
        <div className="label-input space-center">
          <div className="font-14 font-semibold color-black">
            Already have an account?
          </div>
          <a className="font-14 font-semibold blue-color no-deco" href="/login">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
