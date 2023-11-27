import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Ensure this path is correct
import bikyImage from '../assets/bikyimage.png'; // Adjust the import path if necessary


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Add authentication logic here
    // For demonstration, navigate to homepage on any input
    navigate('/homepage');
  };
  return (
    <div className="login-container">
      <div className="login-form">
      <h6>CHIEF? IS IT REALLY YOU?</h6>
        <h2>Log In to your Account</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={credentials.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={credentials.password} 
            onChange={handleInputChange} 
            required 
          />
          <div className="form-options">
            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="continue-button">CONTINUE</button>
          <div className="alternative-options">
            <button type="button" onClick={() => navigate('/homepage')} className="visitor-button">
              Be Visitor and Just Look!
            </button>
            <span>Or</span>
          </div>
        </form>
        <p className="signup-link">
          First Timer? <Link to="/register">SIGN UP HERE</Link>
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

export default Login;