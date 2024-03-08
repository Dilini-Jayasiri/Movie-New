import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePasswordStrength = (pw) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return strongPasswordRegex.test(pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!validatePasswordStrength(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    try {
      const newUser = {
        username,
        email,
        password,
        confirmPassword,
      };

      const response = await axios.post(
        'https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/user',
        newUser,
        {
          withCredentials: false,
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      console.log('User created:', response.data);

      // Optionally, you can reset the form fields after successful submission
      onClear();
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.status === 400) {
        window.alert('Email already exists');
      } else {
        window.alert('An error occurred during signup');
      }
    }
  };

  const onClear = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

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
