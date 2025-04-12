import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://world.openfoodfacts.org/cgi/search.pl?search_terms=chocolate&search_simple=1&action=process&json=1");
        const data = await res.json();
        setProducts(data.products.slice(0, 20)); // limit to 20 results
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image_front_small_url || "https://via.placeholder.com/150"}
              alt={product.product_name || "No name"}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{product.product_name || "Unnamed Product"}</h3>
              <p className="text-sm text-gray-600">{product.brands}</p>
              <p className="text-sm text-gray-500 mt-1">Nutrition Score: {product.nutrition_grades || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;