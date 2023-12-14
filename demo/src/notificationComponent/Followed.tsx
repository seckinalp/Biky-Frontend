// Followed.tsx
import React from 'react';

interface FollowedProps {
  name: string;
  time: string;
  onFollowBack: () => void;
}

const Followed: React.FC<FollowedProps> = ({ name, time, onFollowBack }) => {
  return (
    <div className="followed-notification">
      <p>{name} followed you.</p>
      <p>{time}</p>
      <button onClick={onFollowBack}>Follow Back</button>
    </div>
  );
};

export default Followed;
