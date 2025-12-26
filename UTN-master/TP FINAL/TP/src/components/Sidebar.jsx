import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ isOpen, onClose, navLinks }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <button onClick={onClose} className="sidebar-close-btn">
          &times; 
        </button>
        <nav className="sidebar-nav">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="sidebar-link afacad-flux"
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;