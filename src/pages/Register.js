/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as apiRegister } from "../services/client";

export default function Register() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(ture);
    
    try {
      // TODO: call register API then redirect to login
      await apiRegister({ username, password });
      navigate('/login');
    } catch (err) {
      setError(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Account</h1>
    
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
              
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
          
        <button type="submit" disabled={loading}>
        {loading ? "Creating.." : "Register"}
        </button>
      </form>
      <p>
        Do you already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
