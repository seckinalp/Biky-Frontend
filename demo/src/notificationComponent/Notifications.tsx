// Notifications.tsx
import React, { useEffect, useState } from 'react';
import Followed from './Followed';
import './Notifications.css'; // Make sure this path is correct
import { GetAllUnseen, SetAllUnseen } from '../logic/backend';



export interface NotificationSendRequest {
  notificationID: string,
  content: string,
  isSeen: boolean
}


const Notifications: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [notifications, setNotifications] = useState<NotificationSendRequest[]>([]);
  // Function to handle the closing of notifications
  const handleClose = () => {
    onClose();   
  };
  // Don't render if the component is not visible
  if (!isVisible) {
    return null;
  }
    // Fetching notification data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await GetAllUnseen();
        setNotifications([...result].reverse());
        SetAllUnseen();
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
      }
    };
      
      fetchData(); 
  }, []); 


  return (
    <div className="notifications-box">
      <div className="notifications-header">
        Notifications
        <button onClick={handleClose} className="generic-close-button"></button>
      </div>
      {notifications.map((notification) => (
        <Followed
          key={notification.notificationID}
          text={notification.content}
          isSeen={notification.isSeen}
        />
      ))}
    </div>
  );
};

export default Notifications;
