import React, { useState } from 'react';
import './SignUp.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ControlPointDuplicate } from '@material-ui/icons';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password ||!username ||!confirmPassword) {
      console.error("Error: email and pw cannot be null");
      return;
    }
    const newUser = {
      username,
      email,
      password,
      confirmPassword
    };
    console.log("Submitting form with data:", newUser);

    axios.post("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/user", newUser, {
      withCredentials: false,
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
        // Add any other headers as needed
      }
    })
    .then((response) => {
      console.log("User created:", response.data);
      
      // Optionally, you can reset the form fields after successful submission
      //onClear();
      navigate("/movies/popular");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
      }

  const onClear = () => {
       setUserName("");
       setEmail("");
       setPassword("");
       setConfirmPassword("")
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

