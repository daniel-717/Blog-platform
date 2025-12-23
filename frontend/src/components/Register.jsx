import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/users/register';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(API_URL, { username, email, password });
      // Log the user in immediately after successful registration
      login(response.data); 
      navigate('/'); 
    } catch (err) {
      const message = err.response && err.response.data.message 
                      ? err.response.data.message 
                      : 'Registration failed.';
      setError(message);
    }
  };

  const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', margin: '5px 0' };


  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>User Registration</h2>
      {error && <p style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={inputStyle}
        />
        <label style={{ marginTop: '10px' }}>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={inputStyle}
        />
        <label style={{ marginTop: '10px' }}>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={inputStyle}
        />
        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;