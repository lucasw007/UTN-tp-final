import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import '../styles/product-detail.css'; 

function ProductDetailPage({ products, addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  
  useEffect(() => {
  
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
     
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      
      console.error("Producto no encontrado:", productId);
      setProduct(null);
    }
  }, [productId, products]); 

 
  useEffect(() => {
    if (product) {
      console.log("ProductDetailPage - product.image:", product.image);
    }
  }, [product]);


  if (!product) {
    return <div className="product-detail-loading">Cargando producto o producto no encontrado...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Por favor, selecciona un color y una talla.'); 
      return;
    }

    addToCart({ ...product, selectedColor, selectedSize });
    alert(`"${product.name}" (${selectedColor}, ${selectedSize}) añadido al carrito!`); 
  };

  return (
    <main className="product-detail-page-main">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img
            src={product.image.startsWith('/') ? product.image : `/${product.image}`}
            alt={product.name}
            className="product-main-image"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x700/FF0000/FFFFFF?text=Error+Loading+${product.alt.replace(/\s/g, '+')}`; }}
          />
        </div>
        <div className="product-details-section">
          <p className="product-breadcrumb">Inicio &gt; Productos &gt; {product.name}</p>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="product-description">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="product-options">
              <p className="option-label">COLOR:</p>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-options">
              <p className="option-label">TALLAS:</p>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            AGREGAR AL CARRITO
          </button>

          <div className="payment-shipping-info">
            <div className="info-item">
              <h4>MEDIOS DE PAGO</h4>
              <p>Mercado Pago, Transferencia Bancaria</p>
            </div>
            <div className="info-item">
              <h4>MEDIOS DE ENVIO</h4>

              <p>Correo Argentino, Motomensajería</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;