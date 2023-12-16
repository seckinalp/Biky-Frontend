import React, { useState } from 'react';
import './SearchComponent.css'; // Make sure the path is correct
import ShowRow from '../showRowComponent/ShowRow'; 

interface SearchItem {
  id: number;
  name: string;
  avatarUrl: string;
}

const initialItems: SearchItem[] = [
  // Add initial items here
  { id: 1, name: 'Marc Zuckerberg', avatarUrl: 'path/to/avatar1.png' },
  { id: 2, name: 'Elon Musk', avatarUrl: 'path/to/avatar2.png' },
  // More items...
];

interface SearchComponentProps {
  onClose: () => void;
  initialItems: SearchItem[]; // Add this line to accept initialItems as a prop
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onClose, initialItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>(initialItems);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (!query) {
      setFilteredItems(initialItems);
      return;
    }
  
    // Sadece isimlerin başlangıcında arama yap
    const matchedItems = initialItems.filter((item) =>
      item.name.toLowerCase().startsWith(query.toLowerCase())
    );
  
    setFilteredItems(matchedItems);
  };

  const handleItemClick = (itemId: number) => {
    console.log('Item clicked:', itemId);
    // Implement further logic as needed
  };

  const handleCloseClick = () => {
    onClose(); // Hide the entire component
  };

  if (!isVisible) return null; // Do not render the component if not visible

  return (
    <div className="search-component">
      <div className="search-header">
        <span className="search-title">Search</span>
        <button className="close-button" onClick={handleCloseClick}></button>
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
                key={item.id}
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
