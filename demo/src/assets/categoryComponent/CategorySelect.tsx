import React, { useState } from 'react';

interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

interface CategorySelectProps {
  data: Category[];
}

const CategorySelect: React.FC<CategorySelectProps>  = ({ data }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryChange = (category: Category, level: number) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[level] = category;
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

  let selects: JSX.Element[] = [];
  selects = [renderSelect(data, 0)];
  let currentCategories = selectedCategories[0]?.children || [];

  for (let i = 1; i <= selectedCategories.length; i++) {
    selects.push(renderSelect(currentCategories, i));
    currentCategories = selectedCategories[i]?.children || [];
  }

  return (
    <div>
      {selects}
    </div>
  );
};

export default CategorySelect;
