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
  const [emailError, setEmailError] = useState('');
  const validateEmail = () => {
    if (!formData.email.includes('@')) {
      setEmailError('Please enter a valid email');
      console.log("Email error:", emailError);

      return false;
    }
    if (!formData.email.endsWith('bilkent.edu.tr')) {
      setEmailError('Enter a Bilkent mail');
      console.log("Email error:", emailError);
      return false;
    }
    setEmailError('');
    console.log("Email error:", emailError);
    // Clear the error message
    return true;
  };
  const validatePassword = () =>{
    if (formData.password !== formData.confirmPassword ) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  }
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'password' || name === 'confirmPassword') { // Adjust according to your field names
      setError('');
    }
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data: ",formData)
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (!(isEmailValid && isPasswordValid) ) {
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
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Username" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="email" 
            placeholder="Enter Your Bilkent Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: emailError !== '' ? '1px' : '20px' }} // Adjust the values as needed
            className={emailError ? 'input-error' : ''} 
          />
          {emailError !== '' && <div className="error-message">{emailError}</div>}
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: error !== '' ? '1px' : '20px' }} // Adjust the values as needed

          />
          {error && <p className="error-message">{error}</p>} {/* Display error message if passwords do not match */}

          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: error !== '' ? '1px' : '20px' }} // Adjust the values as needed

          />
          {error && <p className="error-message">{error}</p>} {/* Display error message if passwords do not match */}

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
