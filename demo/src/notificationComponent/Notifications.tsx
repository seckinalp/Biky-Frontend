// Notifications.tsx
import React, { useEffect, useState } from 'react';
import Followed from './Followed';
import './Notifications.css'; // Make sure this path is correct
import { GetAllUnseen, SetAllUnseen } from '../logic/backend';

interface Notification {
  id: number;
  time: string;
  userName: string;
  text: string;
  isSeen: boolean;
}

export interface NotificationSendRequest {
  notificationID: string,
  content: string,
  isSeen: boolean
}

interface NotificationsProps {
  notifications: NotificationSendRequest[];
}

const Notifications: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [notifications, setNotifications] = useState<NotificationSendRequest[]>([]);

  const handleClose = () => {
    onClose();   
  };

  if (!isVisible) {
    return null;
  }
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
