import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [statusMessage, setStatusMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true); // state to control visibility

  const handleReport = () => {
    setStatusMessage('Problem reported!');
    // Additional logic for reporting a problem
  };

  const handleLogout = () => {
    setStatusMessage('Logged out successfully!');
    // Additional logic for logging out
  };

  const handleClose = () => {
    setIsVisible(false); // When the button is clicked, set the visibility to false
  };

  // Return null if the component should not be visible
  if (!isVisible) return null;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <span>Settings</span>
        <button className="close-button" onClick={handleClose}>✖</button>
      </div>
      <ul className="settings-list">
        <li className="settings-item" onClick={handleReport}>
          <span className="icon">🚩</span> Report a problem
        </li>
        <li className="settings-item" onClick={handleLogout}>
          <span className="icon">↩️</span> Log out
        </li>
      </ul>
    </div>
  );
}

export default Settings;
