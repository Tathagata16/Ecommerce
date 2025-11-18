import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ProductList = ({ 
  products, 
  pagination, 
  onPageChange, 
  onEdit, 
  onDelete, 
  isAdmin = false,
  loading = false 
}) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      
      <Pagination
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductList;