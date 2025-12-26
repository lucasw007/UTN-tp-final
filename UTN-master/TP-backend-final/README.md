# TP Backend Final - API RESTful en TypeScript

💻 API RESTful con CRUD, autenticación y filtros avanzados
📝 Descripción
Una robusta API RESTful implementada en TypeScript que proporciona operaciones CRUD completas para productos y categorías, con autenticación JWT, validaciones de entrada, logging con Morgan, rate limiting, y arquitectura MVC profesional. Desplegada en Render.com.

🏛️ Esquema de la Base de Datos
**Productos**
```json
{
  "nombre": "String",
  "descripcion": "String",
  "precio": "Number",
  "stock": "Number",
  "categoria": "ObjectId (ref: Category)"
}
```

**Categorías**
```json
{
  "nombre": "String",
  "descripcion": "String"
}
```

**Usuarios**
```json
{
  "name": "String",
  "email": "String",
  "password": "String (hashed)"
}
```

🛠️ Tecnologías Utilizadas
- **TypeScript** - Tipado estático
- **Node.js** con Express
- **MongoDB** y Mongoose
- **JWT** para autenticación
- **bcryptjs** para hashing de contraseñas
- **Morgan** para logging
- **express-rate-limit** para rate limiting
- **dotenv** para variables de entorno
- **CORS** habilitado

🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- MongoDB (local o en la nube)

### Instalación
1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd TP-backend-final
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tu_base_datos
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRATION=24h
```

### Scripts Disponibles
- `npm run dev` - Ejecuta en modo desarrollo con TypeScript
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta la versión compilada en producción

### Ejecutar Localmente
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

🗺️ Endpoints de la API

### Autenticación (Rate Limited - máximo 5 intentos por 15 minutos)
- `POST /api/v1/auth/register` - Registra un nuevo usuario
- `POST /api/v1/auth/login` - Inicia sesión y devuelve un token JWT

### Productos
- `GET /api/v1/products` - Obtiene todos los productos (con filtros opcionales)
- `GET /api/v1/products/:id` - Obtiene un producto por ID
- `POST /api/v1/products` - Crea un nuevo producto (requiere autenticación)
- `PUT /api/v1/products/:id` - Actualiza un producto (requiere autenticación)
- `DELETE /api/v1/products/:id` - Elimina un producto (requiere autenticación)

### Categorías
- `GET /api/v1/categories` - Obtiene todas las categorías
- `GET /api/v1/categories/:id` - Obtiene una categoría por ID
- `POST /api/v1/categories` - Crea una nueva categoría (requiere autenticación)
- `PUT /api/v1/categories/:id` - Actualiza una categoría (requiere autenticación)
- `DELETE /api/v1/categories/:id` - Elimina una categoría (requiere autenticación)

## 🔍 Filtros de Productos
Los productos se pueden filtrar usando query parameters:
- `categoria` - Filtrar por ID de categoría
- `precioMin` - Precio mínimo
- `precioMax` - Precio máximo
- `nombre` - Búsqueda parcial por nombre (case insensitive)

Ejemplos:
```
GET /api/v1/products?categoria=64a1b2c3d4e5f6789abc123&precioMin=100&precioMax=500
GET /api/v1/products?nombre=laptop
```

💡 Ejemplos de Solicitudes

### Registrar Usuario
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Iniciar Sesión
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Crear Producto
```json
{
  "nombre": "Laptop Gaming",
  "descripcion": "Laptop gaming de alta gama",
  "precio": 1299.99,
  "stock": 50,
  "categoria": "65481d7b9f1e8d3a2c0e4b5a"
}
```

### Crear Categoría
```json
{
  "nombre": "Electronics",
  "descripcion": "Electronic devices and accessories"
}
```

🔑 Autenticación
La API utiliza JWT para la autenticación. Para acceder a rutas protegidas:
1. Obtén un token JWT iniciando sesión
2. Inclúyelo en el header `Authorization`:
```
Authorization: Bearer <tu-token-jwt>
```

🛡️ Seguridad
- **Rate Limiting**: Máximo 5 intentos de autenticación por IP cada 15 minutos
- **Validaciones**: Todas las entradas son validadas
- **Autenticación**: Rutas de escritura requieren token JWT válido
- **Logging**: Todas las solicitudes son registradas con Morgan

🛑 Manejo de Errores
- `400`: Solicitud incorrecta (validaciones fallidas)
- `401`: No autorizado (token inválido/expirado)
- `403`: Prohibido (acceso denegado)
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

🚀 Despliegue en Render.com
1. Conecta tu repositorio de GitHub a Render
2. Configura las variables de entorno en Render
3. El build command es: `npm run build`
4. El start command es: `npm start`
5. URL pública: [Tu URL de Render]

📊 Testing con Postman/Bruno
Importa el archivo `api-test.http` para probar todos los endpoints.

🎥 Demo
[Enlace al video de demostración]
