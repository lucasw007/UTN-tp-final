import React from 'react';
import ProductCard from '../components/ProductCard'; 
import '../styles/productos.css';


function ProductosGeneralPage({ products, addToCart }) {
  const allProducts = products; 

  return (
    <main className="productos-general-main">
      <div className="text-centro-productos">
        <h2 className="fw-bolder text-capitalize">TODOS NUESTROS PRODUCTOS</h2>
      </div>

      <div className="cards-container">
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default ProductosGeneralPage;