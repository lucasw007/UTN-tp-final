// src/services/userService.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userService = {
  // CREATE USER (Registro)
  registerUser: async (data) => {
    const newUser = new User(data);
    // La encriptación se maneja en el pre-save hook del modelo
    return await newUser.save();
  },

  // LOGIN (Lógica de autenticación y generación de JWT)
  loginUser: async (email, password) => {
    // 1. Encontrar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return null; // Usuario no encontrado
    }

    // 2. Comparar la contraseña hasheada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return null; // Contraseña incorrecta
    }

    // 3. Generar el JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Expira en 1 día
    );

    // Devolvemos el token y datos básicos del usuario
    return { token, userId: user._id, email: user.email };
  },

  // Obtener Usuario por ID (para uso interno o perfil)
  getUserById: async (id) => {
    return await User.findById(id).select('-password'); // Excluir la contraseña
  }
};

module.exports = userService;