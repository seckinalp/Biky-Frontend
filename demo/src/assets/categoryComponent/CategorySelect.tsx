import React, { useState } from 'react';
import './CategorySelect.css'; 

interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

interface CategorySelectProps {
  data: Category[];
  onCategoryChange: (categoryId: number) => void; 
}

const CategorySelect: React.FC<CategorySelectProps> = ({ data, onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryChange = (category: Category, level: number) => {
    const newSelectedCategories = selectedCategories.slice(0, level);
    newSelectedCategories[level] = category;
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(category.categoryID);
  };
  const renderSelect = (categories: Category[], level: number) => {
    // Determine the label based on the selected category or default text
    
    const label = level === 0 ? 'Category:' : `${selectedCategories[level - 1]?.name} Options:`;

    // Only render the select if there are categories to display
    if (categories.length === 0) {
      return null; // No children to display, so we don't render a select
    }
    return (
      <div key={level} className="category-select-group">
        <label className="category-select-label">
          {label}
          <select
            className="category-filter-select"
            value={selectedCategories[level]?.categoryID || ''}
            onChange={(e) => {
              const selectedCategory = categories.find(cat => cat.categoryID.toString() === e.target.value);
              if (selectedCategory) {
                handleCategoryChange(selectedCategory, level);
              }
            }}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option className='option-category' key={category.categoryID} value={category.categoryID}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };
  let selects = [renderSelect(data, 0)];

  for (let i = 0; i < selectedCategories.length; i++) {
    // Only add the next select if there are children in the current selection
    const currentChildren = selectedCategories[i]?.children;
    if (currentChildren && currentChildren.length > 0) {
      selects.push(renderSelect(currentChildren, i + 1));
    }
  }

  return <div className="category-select-container">{selects}</div>;
};



export default CategorySelect;
