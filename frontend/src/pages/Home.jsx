import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { productAPI } from '../lib/axios.js';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await productAPI.getProducts(page, 9);
      
      if (response.success) {
        setProducts(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Error fetching products: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-brand">E-Commerce Store</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
        </div>
      </nav>

      <div className="main-content">
        <header className="page-header">
          <h1>Our Products</h1>
          <p>Discover amazing products at great prices</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <ProductList
          products={products}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;