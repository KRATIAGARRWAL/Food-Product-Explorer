import { useState, useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';
import { fetchCategories } from '../../services/api';

const CategoryFilter = () => {
  const { handleCategoryChange, selectedCategory } = useProductContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  
  const MAX_CATEGORIES = 10;
  
  
useEffect(() => {
  const loadCategories = async () => {
    try {
      console.log('Starting to load categories');
      setLoading(true);
      const result = await fetchCategories();
      console.log('Categories result:', result);
      
     
      let processedCategories = [];
      
      
      if (result.tags) {
        console.log('Using tags format, count:', result.tags.length);
        processedCategories = result.tags.filter(tag => tag.products > 100);
      } 
      else {
        console.log('Using direct object format');
        processedCategories = Object.entries(result)
          .filter(([_, category]) => category.products > 100)
          .map(([id, category]) => ({
            id,
            name: category.name?.en || id.replace(/-/g, ' '),
            products: category.products || 0
          }));
      }
      
      console.log('Processed categories count:', processedCategories.length);
    
      const sortedCategories = processedCategories
        .sort((a, b) => b.products - a.products)
        .slice(0, 50); 
      
      console.log('Final categories to display:', sortedCategories.length);
      setCategories(sortedCategories);
      setError(null);
    } catch (err) {
      console.error('Category loading error:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };
  
  loadCategories();
}, []);
  const displayedCategories = showAll ? categories : categories.slice(0, MAX_CATEGORIES);
  
  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Categories</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === ''
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        
        {displayedCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category.name || category.id.replace(/-/g, ' ')}
          </button>
        ))}
        
        {categories.length > MAX_CATEGORIES && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200"
          >
            {showAll ? 'Show Less' : `Show More (${categories.length - MAX_CATEGORIES})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;