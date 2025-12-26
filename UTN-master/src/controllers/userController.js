// src/controllers/userController.js
const userService = require('../services/userService');

const userController = {
  // POST /api/auth/register
  register: async (req, res) => {
    try {
      // El servicio maneja la creación y el hasheo de la contraseña
      const newUser = await userService.registerUser(req.body);
      // Excluimos la contraseña en la respuesta
      const { password, ...userData } = newUser.toObject(); 
      return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: userData });
    } catch (error) {
      if (error.code === 11000) { // Código de error de Mongoose para índice único (Email ya existe)
         return res.status(400).json({ message: 'El email ya está registrado.' });
      }
      return res.status(400).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
  },

  // POST /api/auth/login
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Se requieren email y contraseña.' });
    }

    try {
      const authResult = await userService.loginUser(email, password);

      if (!authResult) {
        return res.status(401).json({ message: 'Credenciales inválidas.' }); // 401 Unauthorized
      }

      // Devolvemos el JWT en la respuesta
      return res.status(200).json({
        message: 'Inicio de sesión exitoso.',
        token: authResult.token,
        userId: authResult.userId
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor durante el login.', error: error.message });
    }
  }
  // Puedes añadir un getCurrentUser si es necesario
};

module.exports = userController;