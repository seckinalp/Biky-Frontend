import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Make sure the path to your CSS file is correct
import bikyImage from '../assets/bikyimage.png'; // Adjust the import path if necessary


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return; // Stop the form from submitting
    }

    // TODO: Implement your registration logic here
    // If everything is okay, navigate to the homepage
    console.log(formData.password);
    navigate('/homepage');
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h6>LETS GET STARTED BILKENTERS</h6>
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message if passwords do not match */}
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleInputChange} 
            required 
          />
          <button type="submit">Get Started</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="login-link">LOGIN HERE</Link>
        </p>
      </div>
      <div className="branding-container">
        <img src={bikyImage} alt="biky" className="biky-image" />
        <h1>Don't be an engineer,<br /> socialize with biky.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  );
};

export default Register;
