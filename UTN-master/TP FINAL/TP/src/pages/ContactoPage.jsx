import React, { useState } from 'react';
import '../styles/contacto.css';

function ContactoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState(''); 
  const [gender, setGender] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'gender') { 
      setGender(value);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Datos del formulario de contacto:');
    console.log('Nombre:', name);
    console.log('Teléfono:', phone);
    console.log('Email:', email);
    console.log('Género:', gender); 
    console.log('Mensaje:', message);

    
    setName('');
    setPhone(''); 
    setEmail('');
    setGender(''); 
    setMessage('');

    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <main className="contacto-page-main">
      <div className="contact-container">
        <h1 className="contact-title">Contáctanos</h1>
        <p className="contact-description">
        Si tienes alguna pregunta u otra solicitud puedes rellenar el formulario y ponerte en contacto con nosotros!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre y Apellido:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Género:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Hombre"
                  checked={gender === 'Hombre'}
                  onChange={handleInputChange}
                /> Hombre
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Mujer"
                  checked={gender === 'Mujer'}
                  onChange={handleInputChange}
                /> Mujer
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Otro"
                  checked={gender === 'Otro'}
                  onChange={handleInputChange}
                /> Otro
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar Mensaje</button>
        </form>

        <div className="contact-info">
          <h3>Nuestra Información de Contacto</h3>
          <p>Email: reissindumentaria@gmail.com</p>
          <p>Teléfono: +54 9 11 5968-2343</p>
          <p>Dirección: Monroe 3002, Ciudad Autónoma de Buenos Aires, Argentina</p>
        </div>
      </div>
    </main>
  );
}

export default ContactoPage;