import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';
import SortOptions from '../components/products/SortOptions';
import ProductList from '../components/products/ProductList';
import { useProductContext } from '../context/ProductContext';

const HomePage = () => {
  const { searchQuery, selectedCategory } = useProductContext();
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    } else if (selectedCategory) {
      return `Products in ${selectedCategory.replace(/-/g, ' ')}`;
    } else {
      return 'Food Products';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      
      <SearchBar />
      
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <CategoryFilter />
        </div>
        
        <div className="lg:w-3/4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{getPageTitle()}</h2>
          </div>
          
          <SortOptions />
          
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;