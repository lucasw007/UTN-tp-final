// src/middleware/verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  // Buscar el token en el encabezado Authorization (Bearer Token)
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado. Acceso denegado.' });
  }

  // El formato esperado es "Bearer <TOKEN>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Formato de token inválido. Acceso denegado.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Añadir los datos del usuario (id, email) a la solicitud para uso posterior
    req.user = decoded;
    next(); // Continuar con el siguiente middleware/controlador
  } catch (err) {
    // Si el token no es válido o ha expirado
    return res.status(401).json({ message: 'Token inválido o expirado. No autorizado.' });
  }
};

module.exports = verifyToken;