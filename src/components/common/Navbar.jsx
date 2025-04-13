import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white" 
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
            <span className="text-white font-bold text-xl">Food Explorer</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors hover:underline">
              Home
            </Link>
            <a 
              href="https://world.openfoodfacts.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors hover:underline"
            >
              Open Food Facts
            </a>
            <a 
              href="https://github.com/yourusername/food-product-explorer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-2 pb-3">
              <Link 
                to="/" 
                className="text-white hover:text-blue-200 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="https://world.openfoodfacts.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Open Food Facts
              </a>
              <a 
                href="https://github.com/yourusername/food-product-explorer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;