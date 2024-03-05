import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Implement login logic here
    };
  
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
