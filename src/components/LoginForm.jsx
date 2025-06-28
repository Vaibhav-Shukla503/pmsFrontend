import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { authHeader } from './authheader';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8081/api/auth/signin', formData, authHeader())
      .then(response => {
        const token = response.data.jwtToken;
        const user = response.data.userDto;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        alert('Login successful!');
        navigate('/seller');
      })
      .catch(error => {
        alert("Wrong credentials");
        console.error('Login failed:', error);
      });
  };

  return (
    <div style={styles.background}>
      <div style={styles.blurCard}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login to Propertijo</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            New here? <Link to="/SignUp" style={{ color: '#007bff' }}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};


const styles = {
  background: {
    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurCard: {
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    width: '400px',
    padding: '30px',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default LoginForm;
