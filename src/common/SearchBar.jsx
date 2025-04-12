import { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import { getProductByBarcode } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { handleSearch, searchQuery } = useProductContext();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [searchType, setSearchType] = useState('name'); // 'name' or 'barcode'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // if (!searchInput.trim()) return;
    
    if (searchType === 'name') {
      handleSearch(searchInput);
    } else {
      // Barcode search
      try {
        setIsLoading(true);
        const barcodeResult = await getProductByBarcode(searchInput.trim());
        setIsLoading(false);
        
        if (barcodeResult.status === 1 && barcodeResult.product) {
          // Redirect to product detail page
          navigate(`/product/${searchInput.trim()}`);
        } else {
          setErrorMsg('Product not found. Please check the barcode and try again.');
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMsg('Error searching by barcode. Please try again later.');
      }
    }
  };

  return (
    <div className="mb-6 sticky top-14 z-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Food Product Explorer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <div className="relative">
            <input
              type={searchType === 'barcode' ? 'number' : 'text'}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={searchType === 'name' ? "Search food products..." : "Enter barcode number..."}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name</option>
            <option value="barcode">Barcode</option>
          </select>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {errorMsg && (
        <p className="text-red-500 mt-2 text-sm">{errorMsg}</p>
      )}
    </div>
  );
};

export default SearchBar;