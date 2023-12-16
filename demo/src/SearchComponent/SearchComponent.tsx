import React, { useState } from 'react';
import './SearchComponent.css'; // Make sure the path is correct

interface SearchItem {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
}

const initialItems: SearchItem[] = [
  // Add initial items here
  { id: 1, name: 'Marc Zuckerberg', username: '@marc.zucker31', avatarUrl: 'path/to/avatar1.png' },
  { id: 2, name: 'Marc Zuckerberg', username: '@marc.zucker31', avatarUrl: 'path/to/avatar1.png' },
  // More items...
];

const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
    const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredItems([]);
      return;
    }

    const matchedItems = initialItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.username.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredItems(matchedItems);
  };

  const handleItemClick = (itemId: number) => {
    // Perform actions when an item is clicked
    console.log('Item clicked:', itemId);
  };

  const handleCloseClick = () => {
    setIsVisible(false); // Hide the entire component
  };



  if (!isVisible) return null; // Do not render the component if not visible

  return (
    <div className="search-component">
      <div className="search-header">
        <span className="search-title">Search</span>
        <button className="search-close-btn" onClick={handleCloseClick}>×</button>
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
              <div key={item.id} className="search-item" onClick={() => handleItemClick(item.id)}>
                <img src={item.avatarUrl} alt={item.name} className="search-avatar" />
                <div className="search-info">
                  <div className="search-name">{item.name}</div>
                  <div className="search-username">{item.username}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export default SearchComponent;
