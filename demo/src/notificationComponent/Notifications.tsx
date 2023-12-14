// Notifications.tsx
import React from 'react';
import Followed from './Followed';

interface Notification {
  name: string;
  time: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <Followed
          key={index}
          name={notification.name}
          time={notification.time}
          onFollowBack={() => console.log(`Followed back ${notification.name}`)}
        />
      ))}
    </div>
  );
};

export default Notifications;
