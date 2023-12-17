import React from 'react';
import './ShowRow.css';
import { userSendRequest } from '../comment/Comment';
import { imageLink } from '../logic/backend';

// Update the props interface if you also want to remove username from the data structure
interface ShowRowProps {
  item: userSendRequest;// User data passed to the component
  onItemClick: (id: string) => void;// Function to handle click events on the row
}

const ShowRow: React.FC<ShowRowProps> = ({ item, onItemClick }) => {
  return (
    <div className="show-row" onClick={() => onItemClick(item.userID)}>
      <img src={item?.profileImage == "" || item?.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${item?.profileImage}`} alt={item.nickname} className="show-row-avatar" />
      <div className="show-row-info">
        <div className="show-row-name">{item.nickname}</div>
      </div>
    </div>
  );
};

export default ShowRow;
