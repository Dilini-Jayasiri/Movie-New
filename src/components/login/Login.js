import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Error: email and ow cannot be null");
      return;
    }
    const loggedUser = {
      email,
      password,
    };
    console.log("Submitting form with data:", loggedUser);

    try {
      localStorage.setItem("user",JSON.stringify(loggedUser));

      const response = await axios
      .post(
        "https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/tokenNew",
        loggedUser,
        {
          // withCredentials: false,
          // crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Add any other headers as needed
          },
        }
      );
        if (response.data) {
          //localStorage.setItem(response);
          const token = response.data;

          localStorage.setItem("token", token);
          try {
            const decode = jwtDecode(token);
          } catch(error){
            console.error("Error decoding token:", error);
          }
         // navigate('/');
         //window.location.reload();
         navigate('/movies/popular');
         window.location.reload();

        } 
          //const role = localStorage.setItem((decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]));

          // const role = decode.role;
          // console.log(role);
          // const role = token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          //console.log(role);
          //localStorage.getItem(token);
          //console.log("User logged in successfully", token);
        else {
          console.error("Login failed");
        }

        // Optionally, you can reset the form fields after successful submission
        onClear();
      } catch(error) {
        console.error("Error logging user:", error);
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