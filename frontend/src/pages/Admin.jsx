import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';
import { productAPI } from '../lib/axios.js';
import { axiosInstance } from '../lib/axios.js';


const Admin = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [loggingOut , setLoggingOut] = useState(false);

    const navigate = useNavigate();

    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            const response = await productAPI.getProducts(page, 9);

            if (response) {
                setProducts(response.data);
                setPagination(response.pagination);
            }
        } catch (err) {
            console.log('Error:', err);
            setMessage('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddProduct = async (productData) => {
        try {
            const response = await productAPI.createProduct(productData);

            if (response) {
                setMessage('Product added successfully!');
                setShowAddForm(false);
                fetchProducts(currentPage);
            }
        } catch (err) {
            setMessage('Error adding product: ' + err.message);
        }
    };

    const handleEditProduct = async (productId, productData) => {
        try {
            const response = await productAPI.updateProduct(productId, productData);

            if (response) {
                setMessage('Product updated successfully!');
                setEditingProduct(null);
                fetchProducts(currentPage);
            }
        } catch (err) {
            setMessage('Error updating product: ' + err.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await productAPI.deleteProduct(productId);

            if (response) {
                setMessage('Product deleted successfully!');
                fetchProducts(currentPage);
            }
        } catch (err) {
            setMessage('Error deleting product: ' + err.message);
        }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user ? true : false;
    const isAdmin = user?.email == "tathagataghosh1609@gmail.com";

    const handleLogout = async () => {
        setLoggingOut(true);
        const res = await axiosInstance.post('/logout');
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate('/login');
        }, 2000);

        setLoggingOut(false);

    }

    return (
        <div className="admin-page">
            <nav className="navbar">
                <div className="nav-brand">E-Commerce Store</div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {isAdmin && (<Link to="/admin" className="nav-link">Admin</Link>)}
                    {!isLoggedIn && (<Link to="/login" className="nav-link">Login</Link>)}
                    {!isLoggedIn && (<Link to="/signup" className="nav-link">Signup</Link>)}
                    <button onClick={handleLogout}>{loggingOut ? "logging out" : "logout"}</button>
                </div>
            </nav>

            <div className="main-content">
                <header className="page-header">
                    <h1>Product Management</h1>
                    <p>Admin panel for managing products</p>
                </header>

                {message && (
                    <div className="message">
                        {message}
                        <button onClick={() => setMessage('')}>×</button>
                    </div>
                )}

                <div className="admin-actions">
                    <button
                        className="btn-primary"
                        onClick={() => setShowAddForm(true)}
                    >
                        Add New Product
                    </button>
                </div>

                {showAddForm && (
                    <AddProductForm
                        onSubmit={handleAddProduct}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}

                {editingProduct && (
                    <EditProductForm
                        product={editingProduct}
                        onSubmit={handleEditProduct}
                        onCancel={() => setEditingProduct(null)}
                    />
                )}

                <ProductList
                    products={products}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onEdit={setEditingProduct}
                    onDelete={handleDeleteProduct}
                    isAdmin={true}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Admin;