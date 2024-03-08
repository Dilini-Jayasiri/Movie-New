import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Error: email and password cannot be null");
      return;
    }

    const loggedUser = {
      email,
      password,
    };
    console.log("Submitting form with data:", loggedUser);

    try {
      const response = await axios.post(
        "https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/tokenNew",
        loggedUser,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data) {
        const token = response.data;

        localStorage.setItem("token", token);

        try {
          const decode = jwtDecode(token);
        } catch (error) {
          console.error("Error decoding token:", error);
        }

        navigate('/movies/popular');
        window.location.reload();
      } else {
        console.error("Login failed");
        // Display alert for incorrect email or password
        window.alert("Incorrect email or password. Please try again.");
      }

      // Optionally, you can reset the form fields after successful submission
      onClear();
    } catch (error) {
      console.error("Error logging user:", error);

      // Display alert for general login error
      window.alert("An error occurred during login. Please try again.");
    }
  };

  const onClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
