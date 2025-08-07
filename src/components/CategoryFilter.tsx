import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};