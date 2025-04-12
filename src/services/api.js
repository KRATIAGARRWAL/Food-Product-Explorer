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
  