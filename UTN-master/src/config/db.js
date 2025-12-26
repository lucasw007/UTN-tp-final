// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Opciones obsoletas, Mongoose las gestiona por defecto ahora,
      // pero puedes dejarlas si usas versiones muy antiguas:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    // Terminar el proceso si no se puede conectar a la DB
    process.exit(1);
  }
};

module.exports = connectDB; 