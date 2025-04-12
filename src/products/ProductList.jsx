
import { useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import { useProductContext } from '../../context/ProductContext';
import Loader from '../common/Loader';

const ProductList = () => {
  const { products, loading, error, hasMore, loadMore } = useProductContext();
  
  const observer = useRef();
  
  // Setup the intersection observer for infinite scrolling
  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => loadMore(true)} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found. Try adjusting your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => {
          // Add ref to the last product for infinite scrolling
          if (index === products.length - 1) {
            return (
              <div key={product.code} ref={lastProductRef}>
                <ProductCard product={product} />
              </div>
            );
          }
          return <ProductCard key={product.code} product={product} />;
        })}
      </div>
      
      {loading && (
        <div className="py-6 flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProductList;