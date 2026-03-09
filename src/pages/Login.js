/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from "../services/client";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // TODO: call login API and pass returned token to auth context
      const { token } = await apiLogin({ username, password });
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
    
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
        {loading ? "Logging in..." : "Logged In"}
          </button>
      </form>
            
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
