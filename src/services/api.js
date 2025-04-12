const BASE_URL = 'https://world.openfoodfacts.org';


export const fetchProducts = async (page = 1, pageSize = 20) => {
    try {
      const response = await fetch(`${BASE_URL}/cgi/search.pl?action=process&sort_by=unique_scans_n&page_size=${pageSize}&page=${page}&json=true`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };


export const searchProductsByName = async (query, page = 1, pageSize = 20) => {
    try {
      const response = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&page_size=${pageSize}&page=${page}&json=true`);
      if (!response.ok) throw new Error('Failed to search products');
      return response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  };

  
export const getProductByBarcode = async (barcode) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
      throw error;
    }
  };
  
  
export const fetchProductsByCategory = async (category, page = 1, pageSize = 20) => {
    try {
      // Using the search endpoint with category filter is more reliable
      const response = await fetch(
        `${BASE_URL}/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}&page_size=${pageSize}&page=${page}&json=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  };


  
export const fetchCategories = async () => {
    try {
      // Use the search endpoint with facets to get category information
      const response = await fetch(`${BASE_URL}/cgi/search.pl?action=process&tagtype_0=categories&page_size=0&json=true`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      
      // Check if the facets data contains categories
      if (data && data.facets) {
        // Find the categories facet
        const categoriesFacet = data.facets.find(facet => facet.id === 'categories');
        
        if (categoriesFacet && Array.isArray(categoriesFacet.tags)) {
          // Transform the tags into our expected format
          const categories = categoriesFacet.tags
            .filter(tag => tag.count > 100) // Only include categories with significant number of products
            .map(tag => ({
              id: tag.id,
              name: tag.name,
              products: tag.count
            }));
          
          return { tags: categories };
        }
      }
      
      // Fallback to hardcoded categories if we can't get data from API
      return { 
        tags: [
          { id: 'beverages', name: 'Beverages', products: 1000 },
          { id: 'dairy', name: 'Dairy Products', products: 900 },
          { id: 'snacks', name: 'Snacks', products: 800 },
          { id: 'cereals', name: 'Cereals', products: 700 },
          { id: 'fruits', name: 'Fruits', products: 600 },
          { id: 'vegetables', name: 'Vegetables', products: 500 },
          { id: 'meats', name: 'Meats', products: 400 },
          { id: 'desserts', name: 'Desserts', products: 300 }
        ] 
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // Return hardcoded fallback categories on error
      return { 
        tags: [
          { id: 'beverages', name: 'Beverages', products: 1000 },
          { id: 'dairy', name: 'Dairy Products', products: 900 },
          { id: 'snacks', name: 'Snacks', products: 800 },
          { id: 'cereals', name: 'Cereals', products: 700 },
          { id: 'fruits', name: 'Fruits', products: 600 },
          { id: 'vegetables', name: 'Vegetables', products: 500 },
          { id: 'meats', name: 'Meats', products: 400 },
          { id: 'desserts', name: 'Desserts', products: 300 }
        ] 
      };
    }
  };