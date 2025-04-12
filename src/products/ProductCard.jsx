import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const {
    code,
    product_name,
    image_url,
    categories,
    ingredients_text,
    nutrition_grades,
  } = product;

  // Helper function to get the badge color based on nutrition grade
  const getNutritionBadgeColor = (grade) => {
    if (!grade) return 'bg-gray-400';
    
    const grades = {
      'a': 'bg-green-500',
      'b': 'bg-green-300',
      'c': 'bg-yellow-400',
      'd': 'bg-orange-400',
      'e': 'bg-red-500',
    };
    
    return grades[grade.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <Link to={`/product/${code}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Fixed height image container */}
        <div className="relative h-60 bg-gray-200 flex-shrink-0">
          {image_url ? (
            <img 
              src={image_url} 
              alt={product_name || 'Food product'} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {nutrition_grades && (
            <div className={`absolute top-2 right-2 ${getNutritionBadgeColor(nutrition_grades)} rounded-full w-8 h-8 flex items-center justify-center text-white font-bold uppercase`}>
              {nutrition_grades}
            </div>
          )}
        </div>
        
        {/* Text content with fixed heights */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-lg h-14 overflow-hidden">
            {product_name || 'Unknown Product'}
          </h3>
          
          <div className="mt-1 h-6 overflow-hidden">
            {categories && (
              <p className="text-sm text-gray-600 truncate">
                {categories}
              </p>
            )}
          </div>
          
          <div className="mt-2 h-10 overflow-hidden">
            {ingredients_text && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {ingredients_text}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;