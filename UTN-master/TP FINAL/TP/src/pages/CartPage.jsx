import React from 'react';
import '../styles/cart.css';

function CartPage({ cartItems, removeFromCart, updateQuantity }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <main className="cart-page-main">
      <div className="cart-container">
        <h1 className="cart-title">Tu Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Tu carrito está vacío. ¡Añade algunos productos!</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <div className="cart-item-quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">Eliminar</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <p className="cart-total">Total: ${calculateTotal().toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <button className="checkout-btn">Proceder al Pago</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;