// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno
const connectDB = require('./src/config/db');

// Importación de rutas
const categoryRoutes = require('./src/routes/categoryRoute.js');
const productRoutes = require('./src/routes/productRoute.js'); // Asume que creaste productRoute.js
const userRoutes = require('./src/routes/userRoute.js');

// Conexión a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Globales
app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita la lectura de JSON en el cuerpo de la solicitud

// Rutas de la API
app.get('/', (req, res) => {
    res.json({ message: 'API RESTful funcionando. Visita /api/v1/ para los endpoints.' });
});

// Agrupación de rutas bajo un prefijo
const apiRouter = express.Router();
apiRouter.use('/categories', categoryRoutes); // <--- Uno de estos es el problema
apiRouter.use('/products', productRoutes);
apiRouter.use('/auth', userRoutes);

app.use('/api/v1', apiRouter);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.listen(PORT, () => {
  console.log(`📡 Servidor escuchando en http://localhost:${PORT}`);
});