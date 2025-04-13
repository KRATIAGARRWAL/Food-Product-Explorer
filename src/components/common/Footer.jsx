import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex md:justify-between">
          {/* Logo and description */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <span className="text-white font-bold text-lg">Food Explorer</span>
            </Link>
            <p className="text-sm">
              Food Product Explorer is a web application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="https://world.openfoodfacts.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Open Food Facts
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/food-product-explorer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* API Info */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-white">API Information</h3>
            <p className="text-sm mb-2">
              This application uses the OpenFoodFacts API, a free and open database of food products from around the world.
            </p>
            <a 
              href="https://world.openfoodfacts.org/data" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              Learn more about the OpenFoodFacts API
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-center">
          <p>&copy; {currentYear} Food Product Explorer. All rights reserved.</p>
          <p className="mt-1">
            Developed for educational purposes. Not affiliated with OpenFoodFacts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;