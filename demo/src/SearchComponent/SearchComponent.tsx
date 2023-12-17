import React, { useState } from 'react';
import './SearchComponent.css'; // Make sure the path is correct
import ShowRow from '../showRowComponent/ShowRow'; 
import { SearchUser, siteLink } from '../logic/backend';
import { userSendRequest } from '../comment/Comment';
import { useNavigate } from 'react-router-dom';

interface SearchItem {
  id: number;
  name: string;
  avatarUrl: string;
}

const initialItems: userSendRequest[] = [
  // Add initial items here
  /*{ id: 1, name: 'Marc Zuckerberg', avatarUrl: 'path/to/avatar1.png' },
  { id: 2, name: 'Elon Musk', avatarUrl: 'path/to/avatar2.png' },*/
  // More items...
];

interface SearchComponentProps {
  onClose: () => void;
  initialItems: userSendRequest[]; // Add this line to accept initialItems as a prop
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onClose, initialItems }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<userSendRequest[]>(initialItems);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredItems(initialItems);
      return;
    }

    // Introduce a delay of 300 milliseconds (adjust as needed)
    await delay(300);

    const matchedItems = await SearchUser(query);
    setFilteredItems(matchedItems);
  };


  const handleItemClick = (itemId: string) => {
    navigate(`../../../profile/${itemId}`);
  };

  const handleCloseClick = () => {
    onClose(); // Hide the entire component
  };

  if (!isVisible) return null; // Do not render the component if not visible

  return (
    <div className="search-component">
      <div className="search-header">
        <span className="search-title">Search</span>
        <button className="generic-close-button" onClick={handleCloseClick}></button>
      </div>
      <div className="search-body">
        <input 
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && filteredItems.length > 0 && (
          <div className="search-results">
            {filteredItems.map((item) => (
              <ShowRow
                key={item.userID}
                item={item}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
