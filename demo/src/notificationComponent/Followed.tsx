// Followed.tsx
import React from 'react';
import './Followed.css'; // Stil dosyasını içe aktar

interface FollowedProps {
  time: string;
  userName: string;
  text: string;
  isSeen: boolean;
}

const Followed: React.FC<FollowedProps> = ({ time, userName, text, isSeen }) => {
  const itemClass = isSeen ? "followed-item seen" : "followed-item";

  return (
    <div className={itemClass}>
      <div className="followed-time">{time}</div>
      <div className="followed-username">{userName}</div>
      <div className="followed-text">{text}</div>
      <button className="follow-button">Follow Back</button>
    </div>
  );
};

export default Followed;
