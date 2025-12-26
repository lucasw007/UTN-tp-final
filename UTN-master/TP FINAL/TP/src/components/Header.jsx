import React from 'react';
import { Link } from 'react-router-dom';

function Header({ brandName, toggleSidebar, totalCartItems }) {
  return (
    <header>
      <nav className="faculty-glyphic-regular navbar-box">
        <Link to="/" className="texto-marca">{brandName}</Link>
        <div className="nav-links">
          <Link to="/carrito" className="cart-icon-container">
            🛒
            {totalCartItems > 0 && (
              <span className="cart-item-count">{totalCartItems}</span>
            )}
          </Link>

          <button onClick={toggleSidebar} className="sidebar-toggle-btn">
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
  