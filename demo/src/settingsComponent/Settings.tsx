import React, { useState } from 'react';
import "./Settings.css";

function Settings() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleReport = () => {
        setStatusMessage('Problem reported!');
        // Additional logic for reporting a problem
    };

    const handleLogout = () => {
        setStatusMessage('Logged out successfully!');
        // Additional logic for logging out
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <span>Settings</span>
                <button className="close-button">✖</button>
            </div>
            <div>        
                 <ul className="settings-list">
                <li className="settings-item" onClick={handleReport}>
                    <span className="icon">🚩</span> Report a problem
                </li>
                <li className="settings-item" onClick={handleLogout}>
                    <span className="icon">↩️</span> Log out
                </li>
            </ul></div>
   
        </div>
    );
}

export default Settings;
