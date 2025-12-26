// src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { // Usaremos email como campo clave para el login
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

// Middleware/Hook 'pre-save' para hashear la contraseña
userSchema.pre('save', async function (next) {
  // Solo hashear si la contraseña ha sido modificada (o es nueva)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generar un salt
    const salt = await bcrypt.genSalt(10);
    // Hashear la contraseña usando el salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pasar el error a Mongoose
  }
});

// Método para comparar la contraseña (útil en el login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;