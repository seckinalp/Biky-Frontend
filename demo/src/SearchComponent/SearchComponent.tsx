import React, { useState } from 'react';
import './SearchComponent.css'; // Make sure the path is correct
import ShowRow from '../showRowComponent/ShowRow'; 
import { SearchUser, siteLink } from '../logic/backend';
import { userSendRequest } from '../comment/Comment';
import { useNavigate } from 'react-router-dom';



const initialItems: userSendRequest[] = [
  // Add initial items here
  /*{ id: 1, name: 'Marc Zuckerberg', avatarUrl: 'path/to/avatar1.png' },
  { id: 2, name: 'Elon Musk', avatarUrl: 'path/to/avatar2.png' },*/
  // More items...
];

interface SearchComponentProps {
  onClose: () => void;// Callback function for closing the search component
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onClose }) => {
  const navigate = useNavigate();// Hook for navigation
  const [searchQuery, setSearchQuery] = useState('');// State for the search query
  const [filteredItems, setFilteredItems] = useState<userSendRequest[]>([]);// State for the filtered search results
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  // Delay function to add a debounce effect on search
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  // Handler for search input changes
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredItems(initialItems);// Reset to initial items if query is empty
      return;
    }

    // Introduce a delay of 300 milliseconds (adjust as needed)
    await delay(300);

    const matchedItems = await SearchUser(query);
    setFilteredItems(matchedItems);
  };

  // Handler for clicking on a search result item
  const handleItemClick = (itemId: string) => {
    // Add a query parameter with a unique key
    navigate(`../../../profile/${itemId}`);
    window.location.reload();
  };
  // Handler for close button click
  const handleCloseClick = () => {
    onClose(); // Hide the entire component
  };
  // Do not render the component if it is not visible
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
