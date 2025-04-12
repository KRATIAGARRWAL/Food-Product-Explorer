import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByBarcode } from '../services/api';
import Loader from '../components/common/Loader';

const ProductDetailPage = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const result = await getProductByBarcode(barcode);
        
        if (result.status === 1 && result.product) {
          setProduct(result.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [barcode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 p-4 rounded-md">
          <p className="text-red-600">{error || 'Product not found'}</p>
        </div>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Products
        </Link>
      </div>
    );
  }

  // Helper function to get the color class for nutrition grade
  const getNutritionGradeColor = (grade) => {
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
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.product_name || 'Product'} 
                className="max-h-64 object-contain" 
              />
            ) : (
              <div className="text-gray-400 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2">No image available</p>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-2">{product.product_name || 'Unknown Product'}</h1>
              
              {product.nutrition_grades && (
                <div className={`${getNutritionGradeColor(product.nutrition_grades)} text-white font-bold rounded-full w-10 h-10 flex items-center justify-center uppercase`}>
                  {product.nutrition_grades}
                </div>
              )}
            </div>
            
            {product.generic_name && (
              <p className="text-gray-600 mb-4">{product.generic_name}</p>
            )}
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-800">Barcode</h3>
                <p className="text-gray-600">{product.code}</p>
              </div>
              
              {product.quantity && (
                <div>
                  <h3 className="font-medium text-gray-800">Quantity</h3>
                  <p className="text-gray-600">{product.quantity}</p>
                </div>
              )}
              
              {product.brands && (
                <div>
                  <h3 className="font-medium text-gray-800">Brand</h3>
                  <p className="text-gray-600">{product.brands}</p>
                </div>
              )}
              
              {product.categories && (
                <div>
                  <h3 className="font-medium text-gray-800">Categories</h3>
                  <p className="text-gray-600">{product.categories}</p>
                </div>
              )}
            </div>
            
            {/* Labels */}
            {product.labels && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {product.labels.split(',').map((label, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              {product.ingredients_text ? (
                <p className="text-gray-700 whitespace, pre-wrap">{product.ingredients_text}</p>
              ) : (
                <p className="text-gray-500 italic">No ingredients information available</p>
              )}
            </div>
            
            {/* Allergens */}
            {product.allergens_tags && product.allergens_tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Allergens</h2>
                <div className="flex flex-wrap gap-2">
                  {product.allergens_tags.map((allergen, index) => (
                    <span 
                      key={index} 
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                    >
                      {allergen.replace('en:', '')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Nutrition Facts */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
              
              {product.nutriments ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nutrient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Per 100g
                        </th>
                        {product.serving_size && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Per Serving ({product.serving_size})
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Energy */}
                      {product.nutriments.energy_100g && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Energy</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.energy_100g} {product.nutriments.energy_unit}
                          </td>
                          {product.serving_size && product.nutriments.energy_serving && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.energy_serving} {product.nutriments.energy_unit}
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Fat */}
                      {product.nutriments.fat_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fat</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.fat_100g}g
                          </td>
                          {product.serving_size && product.nutriments.fat_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.fat_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Saturated Fat */}
                      {product.nutriments['saturated-fat_100g'] !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 pl-8">- Saturated Fat</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments['saturated-fat_100g']}g
                          </td>
                          {product.serving_size && product.nutriments['saturated-fat_serving'] !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments['saturated-fat_serving']}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Carbohydrates */}
                      {product.nutriments.carbohydrates_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Carbohydrates</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.carbohydrates_100g}g
                          </td>
                          {product.serving_size && product.nutriments.carbohydrates_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.carbohydrates_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Sugars */}
                      {product.nutriments.sugars_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 pl-8">- Sugars</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.sugars_100g}g
                          </td>
                          {product.serving_size && product.nutriments.sugars_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.sugars_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Fiber */}
                      {product.nutriments.fiber_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fiber</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.fiber_100g}g
                          </td>
                          {product.serving_size && product.nutriments.fiber_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.fiber_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Proteins */}
                      {product.nutriments.proteins_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Proteins</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.proteins_100g}g
                          </td>
                          {product.serving_size && product.nutriments.proteins_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.proteins_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Salt */}
                      {product.nutriments.salt_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Salt</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.salt_100g}g
                          </td>
                          {product.serving_size && product.nutriments.salt_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.salt_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                      
                      {/* Sodium */}
                      {product.nutriments.sodium_100g !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sodium</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.nutriments.sodium_100g}g
                          </td>
                          {product.serving_size && product.nutriments.sodium_serving !== undefined && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.nutriments.sodium_serving}g
                            </td>
                          )}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No nutrition information available</p>
              )}
            </div>
            
            {/* Additional Product Info */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Origin */}
              {(product.origins || product.countries || product.manufacturing_places) && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Origin</h2>
                  <dl className="space-y-2">
                    {product.origins && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Origins:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.origins}</dd>
                      </div>
                    )}
                    
                    {product.countries && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Countries:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.countries}</dd>
                      </div>
                    )}
                    
                    {product.manufacturing_places && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Manufacturing Places:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.manufacturing_places}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
              
              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                <dl className="space-y-2">
                  {product.nutriscore_score !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nutri-Score:</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.nutriscore_score} (Grade {product.nutriscore_grade?.toUpperCase() || 'Unknown'})</dd>
                    </div>
                  )}
                  
                  {product.nova_group !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">NOVA Group:</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.nova_group} - {getNovaGroupDescription(product.nova_group)}</dd>
                    </div>
                  )}
                  
                  {product.ecoscore_score !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Eco-Score:</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.ecoscore_score} (Grade {product.ecoscore_grade?.toUpperCase() || 'Unknown'})</dd>
                    </div>
                  )}
                  
                  {product.stores && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Available at:</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.stores}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get NOVA group descriptions
const getNovaGroupDescription = (novaGroup) => {
  const descriptions = {
    1: "Unprocessed or minimally processed foods",
    2: "Processed culinary ingredients",
    3: "Processed foods",
    4: "Ultra-processed food and drink products"
  };
  
  return descriptions[novaGroup] || "Unknown classification";
};

export default ProductDetailPage;