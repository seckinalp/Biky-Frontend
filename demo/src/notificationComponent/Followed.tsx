// Followed.tsx
import React from 'react';
import './Followed.css'; // Stil dosyasını içe aktar

interface FollowedProps {
  text: string;
  isSeen: boolean;
}

const Followed: React.FC<FollowedProps> = ({ text, isSeen }) => {
  const itemClass = isSeen ? "followed-item seen" : "followed-item";

  return (
    <div className={itemClass}>
      <div className="followed-text">{text}</div>
   
    </div>
  );
};

export default Followed;
