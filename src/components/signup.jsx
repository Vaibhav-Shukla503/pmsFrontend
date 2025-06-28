import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    axios.post('http://localhost:8081/api/users/', formData)
      .then(response => {
        alert('Signup successful!');
        navigate('/login');
      })
      .catch(error => {
        alert('Signup failed.');
        console.error('Signup error:', error);
      });
  };

  return (
    <div style={styles.background}>
      <div style={styles.blurCard}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>


          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              minLength={6}
              required
            />
          </div>
           <div style={styles.formGroup}>
            <label htmlFor="mobno">Phone Number</label>
            <input
              id="mobno"
              name="mobno"
              type="text"
              placeholder="Enter your Phone Number"
              value={formData.mobno}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
           <div style={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your Address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Sign Up</button>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login</Link>
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
  }
};

export default SignUp;
