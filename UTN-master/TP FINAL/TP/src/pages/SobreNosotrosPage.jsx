import React from 'react';
import '../styles/sobre-nosotros.css';  

function SobreNosotrosPage() {
  return (
    <main className="sobre-nosotros-page-main afacad-flux ">
      <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md my-4">
        <h1 className="text-3x1 font-bold text-gray-800">Sobre Nosotros</h1>
        <div className='sobre-nosotros-text-container'>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bienvenidos a Reiss, tu destino para indumentaria estilo Streetwear hecha con pasión en Argentina.
          Nuestra misión es ofrecerte prendas de alta calidad que no solo te hagan lucir bien, sino que también
          reflejen tu estilo único y tu actitud.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Desde nuestros inicios, nos hemos comprometido con la producción local, apoyando el talento
          y la mano de obra argentina. Cada pieza es diseñada y confeccionada con atención al detalle,
          asegurando durabilidad y comodidad.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Creemos que la moda es una forma de expresión personal, y por eso, en Reiss, encontrarás
          diseños que te permitirán destacar y sentirte auténtico en cualquier ocasión.
          ¡Gracias por ser parte de nuestra historia!
        </p>
        </div>
      </div>
    </main>
  );
}

export default SobreNosotrosPage;