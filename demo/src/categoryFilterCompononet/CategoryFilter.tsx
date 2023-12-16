import React, { useState } from 'react';
import './CategoryFilter.css'; // Make sure the path is correct

interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

interface CategoryFilterProps {
  data: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ data }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [postType, setPostType] = useState<'socialMedia' | 'sale' | null>(null);
  const [showSaleOptions, setShowSaleOptions] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [socialMediaText, setSocialMediaText] = useState('');
  const [saleText, setSaleText] = useState('');
  const handleCategoryChange = (category: Category, level: number) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[level] = category;
    // Remove any deeper selections when a higher level category is changed
    setSelectedCategories(newSelectedCategories.slice(0, level + 1));
  };

  const renderSelect = (categories: Category[], level: number) => {
    return (
      <div key={level}>
        <label>
          {level === 0 ? 'Category:' : `Subcategory Level ${level}:`}
          <select
            className="category-filter-select"
            value={selectedCategories[level]?.categoryID || ''}
            onChange={(e) =>
              handleCategoryChange(
                categories.find(cat => cat.categoryID.toString() === e.target.value) as Category,
                level
              )
            }
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };
  const handleClose = () => {
    setIsVisible(false); // Hide the component
  };
  const handlePostTypeChange = (type: 'socialMedia' | 'sale') => {
    setPostType(type);
    // Only show sale options if 'sale' is selected
    setShowSaleOptions(type === 'sale');
  };
  if (!isVisible) return null;
  let selects: JSX.Element[] = [];
  if (postType === 'sale') {
    selects = [renderSelect(data, 0)];
    let currentCategories = selectedCategories[0]?.children || [];

    for (let i = 1; i <= selectedCategories.length; i++) {
      selects.push(renderSelect(currentCategories, i));
      currentCategories = selectedCategories[i]?.children || [];
    }
  }
  return (
    <div className="category-filter-container">
    <button className="category-filter-close-btn" onClick={handleClose}>X</button>
    <div className="category-filter-header">Filter the Post</div>
    <div className="button-group">
      <button 
        className={`post-type-button ${postType === 'socialMedia' ? 'active' : ''}`}
        onClick={() => setPostType('socialMedia')}
      >
        Social Media Post
      </button>
      <button 
        className={`post-type-button ${postType === 'sale' ? 'active' : ''}`}
        onClick={() => setPostType('sale')}
      >
        Sale Post
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
            <label>Category:</label>
            <select
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              <option value="lostAndFound">Lost and Found</option>
              <option value="secondHand">Second Hand</option>
            </select>
          </div>
        </div>
      )}
      {selects}
      <button className="category-filter-apply-btn">Filter</button>
    </div>
  );
  
};

export default CategoryFilter;