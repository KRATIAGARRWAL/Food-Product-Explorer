import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <ProductProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:barcode" element={<ProductDetailPage />} />
          </Routes>
        </MainLayout>
      </ProductProvider>
    </Router>
  );
}

export default App;