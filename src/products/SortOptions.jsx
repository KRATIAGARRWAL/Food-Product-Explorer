import { useProductContext } from '../../context/ProductContext';

const SortOptions = () => {
  const { sortOption, handleSort } = useProductContext();
  
  const sortOptions = [
    { label: 'Name (A-Z)', field: 'product_name', direction: 'asc' },
    { label: 'Name (Z-A)', field: 'product_name', direction: 'desc' },
    { label: 'Nutrition Grade (Best First)', field: 'nutrition_grades', direction: 'asc' },
    { label: 'Nutrition Grade (Worst First)', field: 'nutrition_grades', direction: 'desc' },
  ];
  
  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, direction] = value.split(':');
    handleSort(field, direction);
  };
  
  const getSelectedValue = () => {
    return `${sortOption.field}:${sortOption.direction}`;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
        <select
          id="sort"
          value={getSelectedValue()}
          onChange={handleSortChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option 
              key={`${option.field}-${option.direction}`} 
              value={`${option.field}:${option.direction}`}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortOptions;