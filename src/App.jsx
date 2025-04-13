import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footbar';

function App() {
  return (
    <Router>
      <ProductProvider>
         <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:barcode" element={<ProductDetailPage />} />
          </Routes>
        <Footer/>
      </ProductProvider>
    </Router>
  );
}

export default App;