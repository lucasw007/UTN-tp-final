import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/v1'; 

export default function ProductPage({ token, handleLogout }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [productsMessage, setProductsMessage] = useState('Cargando productos...');
    
    
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductCategory, setNewProductCategory] = useState(''); 
    const [categories, setCategories] = useState([]); 
    const [creationMessage, setCreationMessage] = useState('');

  
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        fetchProducts(); 
        fetchCategories(); 
    }, [token, navigate]);


    
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                if (data.length > 0) {
                    setNewProductCategory(data[0]._id); 
                }
            }
        } catch (error) {
            console.error('Error cargando categorías:', error);
        }
    };


    
    const fetchProducts = async () => {
        setProductsMessage('Cargando productos...');
        setProducts([]);
        try {
           
            const response = await fetch(`${API_BASE_URL}/products`); 
            
            if (!response.ok) throw new Error('Error al obtener productos.');
            
            const data = await response.json();
            setProducts(data);
            setProductsMessage(data.length === 0 ? 'No hay productos registrados.' : '');

        } catch (error) {
            setProductsMessage(`Error al cargar: ${error.message}`);
        }
    };


    
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setCreationMessage('Creando producto...');
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    nombre: newProductName, 
                    precio: parseFloat(newProductPrice), 
                    stock: 10, 
                    descripcion: "Descripción de prueba",
                    categoria: newProductCategory 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCreationMessage(`Producto "${newProductName}" creado exitosamente.`);
                setNewProductName('');
                setNewProductPrice('');
                fetchProducts(); 
            } else {
                setCreationMessage(`Error al crear: ${data.message || 'Token inválido o datos faltantes.'}`);
            }

        } catch (error) {
            setCreationMessage('Error de conexión al crear producto.');
        }
    };

    return (
        <div className="product-page-container">
            <header className="page-header">
                <h1>Panel de Moderación de Reiss</h1>
                <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </header>

      
            <section className="card creation-section">
                <h2>Crear Nuevo Producto </h2>
                <form onSubmit={handleCreateProduct}>
                    <input type="text" placeholder="Nombre del Producto" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} required />
                    <input type="number" placeholder="Precio" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} required step="0.01" />
                    
                    <select value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} required>
                        <option value="">Seleccione Categoría</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                        ))}
                    </select>

                    <button type="submit">Crear Producto</button>
                </form>
                {creationMessage && <p className="status">{creationMessage}</p>}
            </section>

          
            <section className="card list-section">
                <h2>Listado de Productos</h2>
                {productsMessage && <p className="status">{productsMessage}</p>}
                
                <ul className="products-list">
                    {products.map((p) => (
                        <li key={p._id} className="product-item">
                            <span className="product-name">{p.nombre}</span>
                            <span className="product-price">${p.precio ? p.precio.toFixed(2) : 'N/A'}</span>
                            <span className="product-category">
                                Categoría: <strong>{p.categoria && p.categoria.nombre ? p.categoria.nombre : 'Sin asignar'}</strong>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
