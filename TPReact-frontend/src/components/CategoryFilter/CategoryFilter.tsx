// src/components/CategoryFilter/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">Todas las categorías</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
