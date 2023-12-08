// ForgotPassword.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgot.css'; // Ensure this path points to your Forgot.css file
import bikyImage from '../assets/bikyimage.png'; // Adjust the import path if necessary


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Here you would handle the password reset logic, perhaps calling an API
  };

  return (
    <div className="forgot-container">
    <form className="forgot-form" onSubmit={handleSubmit}>
      <h6>YOUR NEW PASSWORD WILL BE IN YOUR MAILBOX. YOU CAN CHANGE IT AFTER LOGIN</h6>
      <h2>Enter Your Email</h2>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
        <button type="submit" className="reset-button">Reset Your Password</button>

      <div className="or-divider">
        <span>Or</span>
      </div>

      <button onClick={() => navigate('/homepage')}>Be Visitor and Just Look!</button>
      <button onClick={() => navigate('/login')}>Login to Your Account</button>
    </form>
    <div className="branding-container">
        <img src={bikyImage} alt="biky" className="biky-image" />
        <h1>Don't be an engineer,<br /> socialize with biky.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>
  );
};

export default ForgotPassword;