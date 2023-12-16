import React, { useState } from "react";
import "./Homepage.css";
import Navbar from "./navigation/Navbar";
import Settings from "./settingsComponent/Settings";
import Notifications from "./notificationComponent/Notifications";



const Homepage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(prevShowSettings => !prevShowSettings);
    if (showNotifications) setShowNotifications(false); // Toggle the visibility
  };

  const handleNotificationsClick = () => {
    setShowNotifications(prev => !prev);
    // Optionally close settings when notifications are opened
    if (showSettings) setShowSettings(false);
  };
  return (
    <div className='app'>
      <div className='background'></div>
      <Navbar onSettingsClick={handleSettingsClick}
       onNotificationsClick={handleNotificationsClick}  />
      <div className="homepage">
        <div className="app__homepage">
          <div className="homepage__timeline">
            <div className="timeline__left">
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
            {showNotifications && (
                <Notifications 
                  onClose={() => setShowNotifications(false)} 
                  notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
                  { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
                  { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}
                />
              )}
            </div>
            <div className="timeline__middle">
              middle
            </div>
            <div className="timeline__right">
              right
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;