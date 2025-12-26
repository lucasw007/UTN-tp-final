import React from 'react';

function Footer({ brandName, paymentMethods, shippingMethods, contactInfo }) {
  return (
    <footer>
      <div className="box-footer">
        <span className="titulo faculty-glyphic-regular navbar-box fw-bolder">{brandName}</span>
        <div className="line"></div>
        <div className="container-footer">
          <div className="left-colummn">
            <div className="mdp-container">
              <p className="mdp-text afacad-flux">METODOS DE PAGO</p>
              {paymentMethods.map((method, index) => (
                <img
                  key={index}
                  className={`img-${method.alt.toLowerCase().replace(/\s/g, '')}`}
                  src={method.src}
                  alt={method.alt}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x50/FF0000/FFFFFF?text=Error`; }}
                />
              ))}
            </div>
            <div className="envio-container">
              <p className="envio-text afacad-flux">METODOS DE ENVIO</p>
              {shippingMethods.map((method, index) => (
                <img
                  key={index}
                  className={`img-${method.alt.toLowerCase().replace(/\s/g, '')}`}
                  src={method.src}
                  alt={method.alt}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x50/FF0000/FFFFFF?text=Error`; }}
                />
              ))}
            </div>
          </div>
          <div className="right-colummn">
            <div className="contacto-container">
              <span className="contacto-text afacad-flux">CONTACTANOS</span>
              <p className="correo-text afacad-flux"> {contactInfo.email}</p>
              <p className="telefono-text afacad-flux"> {contactInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;