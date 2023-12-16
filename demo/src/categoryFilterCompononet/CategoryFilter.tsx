import React, { useState, useEffect } from 'react';
import './CategoryFilter.css'; // Make sure the path is correct
import { FetchCategories } from '../logic/backend';
import CategorySelect from '../assets/categoryComponent/CategorySelect';

export interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

const categoryData: Category[] = [
  {
    categoryID: 1,
    name: "string",
    children: [
      {
        categoryID: 2,
        name: "lesson",
        children: [
          {
            categoryID: 3,
            name: "cs",
            children: [
              { categoryID: 4, name: "cs223", children: [] },
              { categoryID: 5, name: "cs315", children: [] },
              { categoryID: 6, name: "cs319", children: [] }
            ]
          }
        ]
      }
    ]
  }
  // ... other categories
];
const CategoryFilter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
 
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [postType, setPostType] = useState<'socialMedia' | 'sale' | null>(null);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [socialMediaText, setSocialMediaText] = useState('');
  const [saleText, setSaleText] = useState('');
  const [data, setData] = useState<Category[]>([]);
  const [feedType, setFeedType] = useState<'following' | 'allFeed' | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'socialMedia' | 'sale' | 'following' | 'allFeed' | null>(null);

// ...

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchCategories();
        setData(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
      fetchData();
  }, []); 



  const handleClose = () => {
    onClose(); 
  };

  if (!isVisible) return null;
 
  return (
    <div className="category-filter-container">
    <button className="category-filter-close-btn" onClick={handleClose}>X</button>
    <div className="category-filter-header">Filter the Post</div>
    <div className="button-group">
      <div className='button1'> <button 
        className={`post-type-button ${postType === 'socialMedia' ? 'active' : ''}`}
        onClick={() => setPostType('socialMedia')}
      >
        Social Media Post
      </button></div>
     
      <button 
        className={`post-type-button ${postType === 'sale' ? 'active' : ''}`}
        onClick={() => setPostType('sale')}
      >
        Sale Post
      </button></div>
      <div className="button-group">
        <div className='button2'> <button 
    className={`post-type-button ${selectedFilter === 'following' ? 'active' : ''}`}
    onClick={() => setSelectedFilter('following')}
  >
    See Following
  </button></div>
 
  <button 
    className={`post-type-button ${selectedFilter === 'allFeed' ? 'active' : ''}`}
    onClick={() => setSelectedFilter('allFeed')}
  >
    See all Feed
  </button>
</div>
    {postType === 'socialMedia' && (
      <input
        type="text"
        className="social-media-input"
        placeholder="Check Post Contains a Text"
        value={socialMediaText}
        onChange={(e) => setSocialMediaText(e.target.value)}
      />
    )}
      {postType === 'sale' && (
        <div className="sale-options">
          <div className='contains-input'>
          <input 
          type="text"
          className="sale-input"
          placeholder="Check Post Contains a Text"
          value={saleText}
          onChange={(e) => setSaleText(e.target.value)}
        />
          </div>
       
        <div className="price-input-group">
            <input
              type="text"
              className="price-input"
              placeholder="Minimum Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="text"
              className="price-input"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="category-select-group">
            <label>Post Type:</label>
            <select
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Type</option>
              <option value="lostAndFound">Lost and Found</option>
              <option value="secondHand">Second Hand</option>
            </select>
          </div>
          <CategorySelect data={categoryData}/>
        </div>
        
      )}
      
      <button className="category-filter-apply-btn">Filter</button>
    </div>
  );
  
};

export default CategoryFilter;