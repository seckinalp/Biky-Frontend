import React from 'react';
import './ShowRow.css';

// Update the props interface if you also want to remove username from the data structure
interface ShowRowProps {
  item: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  onItemClick: (id: number) => void;
}

const ShowRow: React.FC<ShowRowProps> = ({ item, onItemClick }) => {
  return (
    <div className="show-row" onClick={() => onItemClick(item.id)}>
      <img src={item.avatarUrl} alt={item.name} className="show-row-avatar" />
      <div className="show-row-info">
        <div className="show-row-name">{item.name}</div>
      </div>
    </div>
  );
};

export default ShowRow;
