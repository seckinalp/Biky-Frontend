// EditProfile.tsx
import React, { useState } from 'react';
import './EditProfile.css';

type EditProfileProps = {
    initialData: {
      username: string;
      password: string;
      bioInfo: string;
    };
    onClose: () => void;
    
}

const EditProfile: React.FC<EditProfileProps> = ({ initialData, onClose }) => {
    
    const [formData, setFormData] = useState({
        username: initialData.username,
        password: initialData.password,
        confirmPassword: initialData.password, // Assuming you want to initialize it with the password
        bioInfo: initialData.bioInfo  
      });
      
  

  // Function to handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validation and submit logic goes here
  };

  return (
  
      
    <form className="register-form" onSubmit={handleSubmit}>
    <div className="edit-profile-header">
        <h2>Edit Profile</h2>
        <button className="close-button1" onClick={onClose}>×</button>
      </div>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="New Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm New Password"
      />
      <textarea
        name="bioInfo"
        value={formData.bioInfo}
        onChange={handleChange}
        placeholder="New Bio"
      />
      <button type="submit" onClick={onClose}>Save Changes</button>
    </form>
    
  );
};

export default EditProfile;