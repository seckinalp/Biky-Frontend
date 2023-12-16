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

  let selects = [renderSelect(data, 0)];
  let currentCategories = selectedCategories[0]?.children || [];

  for (let i = 1; i <= selectedCategories.length; i++) {
    selects.push(renderSelect(currentCategories, i));
    currentCategories = selectedCategories[i]?.children || [];
  }

  return (
    <div className="category-filter-container">
      <button className="category-filter-close-btn">X</button>
      <div className="category-filter-header">Filter the Post</div>
      {selects}
      <button className="category-filter-apply-btn">Filter</button>
    </div>
  );
};

export default CategoryFilter;
