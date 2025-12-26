import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card-box pulse">
      <Link to={`/productos/${product.id}`}>
        <img
          src={product.image}
          alt={product.alt}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x450/FF0000/FFFFFF?text=Error+Loading+${product.alt.replace(/\s/g, '+')}`; }}
        />
      </Link>
      <div>
        <p className="afacad-flux fw-bolder">{product.name}</p>
        <p className="product-price">${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <Link to={`/productos/${product.id}`} className="button-shop">
          VER DETALLE
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;