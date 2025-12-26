// src/models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId, // Tipo para referencia
    ref: 'Category', // Nombre del modelo al que hace referencia
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;