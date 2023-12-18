// Followed.tsx
import React from 'react';
import './Followed.css'; // Stil dosyasını içe aktar

interface FollowedProps {
  text: string;// Text content of the notification
  isSeen: boolean;// Boolean to indicate if the notification has been seen
}
// Functional component for individual notification items
const Followed: React.FC<FollowedProps> = ({ text, isSeen }) => {
    // Dynamically set the class based on whether the notification is seen
  const itemClass = isSeen ? "followed-item seen" : "followed-item";

  return (
    <div className={itemClass}>
      <div className="followed-text">{text}</div>
   
    </div>
  );
};

export default Followed;
