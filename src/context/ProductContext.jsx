// src/context/ProductContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts, searchProductsByName, fetchProductsByCategory } from '../services/api';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState({ field: 'product_name', direction: 'asc' });

  const loadProducts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentPage = reset ? 1 : page;
      let result;
      
      if (searchQuery) {
        result = await searchProductsByName(searchQuery, currentPage);
      } else if (selectedCategory) {
        result = await fetchProductsByCategory(selectedCategory, currentPage);
      } else {
        result = await fetchProducts(currentPage);
      }
      
      const newProducts = result.products || [];
      
      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length > 0);
      if (reset) {
        setPage(1);
      } else {
        setPage(currentPage + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedCategory]);

  useEffect(() => {
    loadProducts(true);
  }, [searchQuery, selectedCategory]);

  const loadMore = () => {
    if (!loading && hasMore) {
      loadProducts();
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (field, direction) => {
    setSortOption({ field, direction });
    
    // Local sorting
    setProducts(prev => {
      const sorted = [...prev].sort((a, b) => {
        let valueA = a[field] || '';
        let valueB = b[field] || '';
        
        if (field === 'nutrition_grades') {
          // Special case for nutrition grades (A is better than E)
          return direction === 'asc' 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        }
        
        if (typeof valueA === 'string') {
          return direction === 'asc' 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        }
        
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      });
      return sorted;
    });
  };

  const value = {
    products,
    loading,
    error,
    hasMore,
    searchQuery,
    selectedCategory,
    sortOption,
    loadMore,
    handleSearch,
    handleCategoryChange,
    handleSort,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};