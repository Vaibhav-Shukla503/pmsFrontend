import React, { useState } from 'react';
import axios from 'axios'; // Install axios if you're making API calls
import { useNavigate ,Link } from 'react-router-dom';
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
   

    console.log(formData); // ✅ You can remove this in production

    
    axios.post('http://localhost:8081/api/auth/signin', formData)
      .then(response => {
        const token = response.data.jwtToken; // ✅ Assuming your backend returns { token: '...' }
        const user = response.data.userDto;
        // ✅ Save token to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
      
        console.log(response);
        alert('Login successful!');

        // ✅ Redirect to dashboard
        navigate('/seller');
      })
      .catch(error => {
        alert("wrong Creadentials");
        console.error('Login failed:', error);
        alert('Invalid credentials.');
      });
  };

  return (
    <div style={{ width: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button block type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
        <Link to="/SignUp">SignUp</Link>
      </form>
    </div>
  );
};

export default LoginForm;
