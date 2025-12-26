import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import ProductList from './components/ProductList';
import Sidebar from './components/Sidebar';

import ContactoPage from './pages/ContactoPage';
import ProductosGeneralPage from './pages/ProductosGeneralPage';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [cartItems, setCartItems] = useState([]); 

  const carouselProps = {
    images: [
      { src: "src/assets/img/imagen1.jpg", alt: "Imagen 1" },
      { src: "src/assets/img/imagen2.jpg", alt: "Imagen 2" },
      { src: "src/assets/img/imagen3.jpg", alt: "Imagen 3" }, 
    ],
    caption: {
      title: "Bienvenidos a Reiss",
      paragraph: "Indumentaria estilo Streetwear hecho en Argentina."
    }
  };


  const featuredProducts = [
    {
      id: "buzo-boxy", 
      image: "src/assets/img/buzo boxy.jpg", 
      alt: "Hoodie Boxy 'Viper'",
      name: "HOODIE BOXY 'Viper'",
      price: 71550.00,
      description: "Buzo estilo oversized con capucha y estampado 'Viper'. Ideal para un look urbano y cómodo. Confeccionado en algodón suave de alta calidad.",
      colors: ["Negro", "Blanco", "Gris"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "joggin-baggy",
      image: "src/assets/img/baggy.jpg",
      alt: "Joggin Baggy 'Stella'",
      name: "JOGGIN BAGGY 'Stella'",
      price: 55000.00,
      description: "Joggin estilo baggy con ajuste relajado y cintura elástica. Perfecto para el día a día y actividades deportivas. Tejido transpirable y resistente.",
      colors: ["Negro", "Azul", "Verde"],
      sizes: ["S", "M", "L"]
    },
    {
      id: "remera-oversize",
      image: "src/assets/img/oversize-1.jpg", 
      alt: "Remera Oversize 'River'",
      name: "REMERA OVERSIZE 'River'",
      price: 32000.00,
      description: "Remera oversized con diseño 'River'. Confeccionada en algodón premium para máxima comodidad y estilo. Ideal para combinar con jeans o joggers.",
      colors: ["Blanco", "Negro"],
      sizes: ["M", "L", "XL"]
    }
  ];

  
  const footerProps = {
    brandName: "REISS",
    paymentMethods: [
      { src: "src/assets/img/mercadopago.jpg", alt: "Mercado Pago" }, 
      { src: "src/assets/img/transferencia-bancaria.png", alt: "Transferencia Bancaria" } 
    ],
    shippingMethods: [
      { src: "src/assets/img/correo-argentino.png", alt: "Correo Argentino" }, 
      { src: "src/assets/img/motomensajeria.jpg", alt: "Motomensajería" } 
    ],
    contactInfo: {
      email: "reissindumentaria@gmail.com",
      phone: "+54 9 11 5968-2343"
    }
  };

  const toggleSidebar = () => {
    console.log("toggleSidebar fue llamado. Estado actual:", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

 
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

 
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) 
    );
  };


  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);


  const appNavLinks = [
    { name: "Inicio", url: "/" },
    { name: "Productos", url: "/productos-general" },
    { name: "Contacto", url: "/contacto" },
    { name: "Sobre Nosotros", url: "/sobre-nosotros" },
  ];


  const headerProps = {
    brandName: "Reiss",
    toggleSidebar: toggleSidebar,
    totalCartItems: totalCartItems,
  };


  return (
    <Router>
      <div className="app-container">
        <Header
          brandName={headerProps.brandName}
          toggleSidebar={headerProps.toggleSidebar}
          totalCartItems={headerProps.totalCartItems}
        />

        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} navLinks={appNavLinks} />

        <Routes>
          <Route path="/" element={
            <main>
              <Carousel images={carouselProps.images} caption={carouselProps.caption} />
              <div className="text-centro">
                <h2 className="fw-bolder text-capitalize">PRODUCTOS DESTACADOS</h2>
              </div>
              <ProductList products={featuredProducts} addToCart={addToCart} />
            </main>
          } />

          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/productos-general" element={<ProductosGeneralPage products={featuredProducts} addToCart={addToCart} />} /> {/* También pasamos addToCart y products aquí */}
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route
            path="/carrito"
            element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
          />
  
          <Route
            path="/productos/:productId"
            element={<ProductDetailPage products={featuredProducts} addToCart={addToCart} />}
          />
        </Routes>


        <Footer
          brandName={footerProps.brandName}
          paymentMethods={footerProps.paymentMethods}
          shippingMethods={footerProps.shippingMethods}
          contactInfo={footerProps.contactInfo}
        />
      </div>
    </Router>
  );
}

export default App;