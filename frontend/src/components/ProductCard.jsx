import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          <span className="product-price">${product.price}</span>
          <span className="product-category">{product.category}</span>
          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        {isAdmin && (
          <div className="product-actions">
            <button 
              className="btn-edit"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button 
              className="btn-delete"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;