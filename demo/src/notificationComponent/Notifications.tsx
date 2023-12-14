// Notifications.tsx
import React, { useState } from 'react';
import Followed from './Followed';
import './Notifications.css'; // Make sure this path is correct

interface Notification {
  id: number;
  time: string;
  userName: string;
  text: string;
  isSeen: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="notifications-box">
      <div className="notifications-header">
        Notifications
        <button onClick={handleClose} className="notifications-close-button">✕</button>
      </div>
      {notifications.map((notification) => (
        <Followed
          key={notification.id}
          time={notification.time}
          userName={notification.userName}
          text={notification.text}
          isSeen={notification.isSeen}
        />
      ))}
    </div>
  );
};

export default Notifications;
