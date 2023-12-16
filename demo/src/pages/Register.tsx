import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Make sure the path to your CSS file is correct
import bikyImage from '../assets/bikyimage.png'; // Adjust the import path if necessary
import { RegisterRequest } from '../logic/backend';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: "",
  });
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');

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
    let isValid = true;
    if (formData.password !== formData.confirmPassword ) {
      setError('Passwords do not match.');
      isValid = false;
    }
    if(formData.password.length < 8){
      setError1('Password is less than 8 characters.');
      isValid = false;
    }

    return isValid;
  }
  const [studentIdError, setStudentIdError] = useState('');
  const validateStudentId = () => {
    if (formData.studentId.length < 8 || !/^\d+$/.test(formData.studentId)) {
      setStudentIdError('Invalid studentId');
      return false;
    }
    setStudentIdError('');
    return true;
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      setEmailError('');
    }
    if (name === 'confirmPassword') { // Adjust according to your field names
      setError('');
    }
    if (name === 'password') { // Adjust according to your field names
      setError1('');
    }
    if (name === 'studentId') setStudentIdError('');
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Form Data: ",formData)
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isStudentIdValid = validateStudentId();

    if (!(isEmailValid && isPasswordValid && isStudentIdValid) ) {
      event.preventDefault();
      return; // Stop the form from submitting
    }
    try {
      RegisterRequest(formData.studentId, formData.name, formData.email, formData.password);
    } catch (error) {
      console.error('Error registering:', error);
    }
    // TODO: Implement your registration logic here
    // If everything is okay, navigate to the homepage
    console.log(formData.password);
    navigate('/login');
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
            type="text" 
            name="studentId" 
            placeholder="Your Bilkent Id" 
            value={formData.studentId} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: studentIdError !== '' ? '1px' : '20px' }}
          />
          {studentIdError && <div className="error-message">{studentIdError}</div>}
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: error1 !== '' ? '1px' : '20px' }} // Adjust the values as needed

          />
          {error1 && <p className="error-message1">{error1}</p>} {/* Display error message if passwords do not match */}

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

          <button className='btn' type="submit">Get Started</button>
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
