TP-Backend-Final: Sistema de Gestión de Productos y Categorías de mi pagina de e-commerce 

1. 📝 Descripción del Proyecto

Este proyecto para el curso de 'Full Stack Developer' es el backend de una aplicación de gestión de productos (un CRUD completo) que incluye un sistema de autenticación de usuarios. Está construido utilizando Node.js, Express y MongoDB (Mongoose), siguiendo una arquitectura modular que separa controladores, rutas, modelos y servicios.

Características Principales:

Autenticación de usuarios mediante JWT (JSON Web Tokens).

Gestión completa (CRUD) de Categorías.

Gestión completa (CRUD) de Productos, con referencias a Categorías.

Rutas protegidas por el middleware de verificación de token.

2. 🏛️ Esquema de la Base de Datos (MongoDB / Mongoose)

El sistema utiliza tres colecciones principales: users, categories y products.

Colección: users (Usuarios)

username: String, Requerido (Nombre único).

email: String, Requerido (Correo electrónico, único).

password: String, Requerido (Contraseña hasheada con bcrypt).

createdAt: Date (Fecha de creación).

Colección: categories (Categorías)

nombre: String, Requerido (Nombre de la categoría, único).

descripcion: String (Descripción breve).

createdAt: Date (Fecha de creación).

Colección: products (Productos)

nombre: String, Requerido (Nombre del producto).

descripcion: String (Descripción detallada).

precio: Number, Requerido.

stock: Number, Requerido (Cantidad disponible).

categoria: ObjectId, Requerido (Referencia a la colección categories).

createdAt: Date (Fecha de creación).

3. 🛠️ Tecnologías Utilizadas

Backend: Node.js (Entorno de ejecución de JavaScript).

Framework: Express.js (Para construir la API REST).

Base de Datos: MongoDB (Base de datos NoSQL).

ODM: Mongoose (Modelado de objetos para MongoDB).

Autenticación: JWT (jsonwebtoken) (Generación y verificación de tokens).

Seguridad: bcrypt (Hasheo de contraseñas).

Desarrollo: CORS, dotenv (Configuración de permisos y variables de entorno).

4. 🚀 Instrucciones para Correr el Proyecto

Sigue estos pasos para levantar el backend localmente:

Prerrequisitos

Tener instalado Node.js.

Tener acceso a una instancia de MongoDB (local o en la nube).

Pasos de Instalación

Clonar el Repositorio y Acceder a la Carpeta:

git clone <URL_DEL_REPOSITORIO>
cd TP-backend-final


Instalar Dependencias:

npm install


Configurar Variables de Entorno:
Crea un archivo llamado .env en la raíz del proyecto. Copia el contenido de .env.example y reemplaza los valores placeholder con tus credenciales reales de MongoDB y JWT.

Ejecución

Iniciar el Servidor:

npm start


El servidor se iniciará y estará disponible en http://localhost:3000.

5. 🗺️ Endpoints de la API (Rutas)

Todos los endpoints tienen el prefijo base /api/v1.

5.1. Autenticación (Rutas Públicas)

POST /auth/register: Crea una nueva cuenta de usuario.

POST /auth/login: Inicia sesión y devuelve un token JWT.

5.2. Gestión de Categorías (Rutas Protegidas)

Requieren Authorization: Bearer <TOKEN_JWT> en el encabezado.

POST /categories: Crea una nueva categoría.

GET /categories: Obtiene todas las categorías.

GET /categories/:id: Obtiene una categoría por su ID.

PUT /categories/:id: Actualiza una categoría existente.

DELETE /categories/:id: Elimina una categoría por su ID.

5.3. Gestión de Productos (Rutas Protegidas)

Requieren Authorization: Bearer <TOKEN_JWT> en el encabezado.

POST /products: Crea un nuevo producto.

GET /products: Obtiene todos los productos (con referencia a categoría).

GET /products/:id: Obtiene un producto por su ID (con referencia a categoría).

PUT /products/:id: Actualiza un producto existente.

DELETE /products/:id: Elimina un producto por su ID.

6. 💡 Ejemplos de Datos Mock (JSON)

6.1. POST /api/v1/auth/register (Crear Usuario)

{
    "username": "usuario_ejemplo",
    "email": "usuario.ejemplo@mail.com",
    "password": "Password123"
}


6.2. POST /api/v1/auth/login (Iniciar Sesión)

{
    "email": "usuario.ejemplo@mail.com",
    "password": "Password123"
}


6.3. POST /api/v1/categories (Crear Categoría)

Importante: Se requiere JWT en el header de autorización.

{
    "nombre": "Electrónica",
    "descripcion": "Dispositivos de consumo y accesorios tecnológicos."
}


6.4. POST /api/v1/products (Crear Producto)

Importante: Reemplaza ID_DE_CATEGORIA_AQUI con el _id de una categoría existente. Se requiere JWT.

{
    "nombre": "Smartphone X",
    "descripcion": "Modelo de gama alta con 128GB de almacenamiento.",
    "precio": 899.99,
    "stock": 45,
    "categoria": "ID_DE_CATEGORIA_AQUI" 
}
