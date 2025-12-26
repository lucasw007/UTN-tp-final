// src/services/productService.js
const Product = require('../models/productModel');

const productService = {
  // CREATE
  createProduct: async (data) => {
    const newProduct = new Product(data);
    return await newProduct.save();
  },

  // READ ALL
  getAllProducts: async () => {
    // Usamos populate para incluir los datos completos de la categoría referenciada
    return await Product.find().populate('categoria', 'nombre descripcion');
  },

  // READ ONE
  getProductById: async (id) => {
    // Usamos populate también para una lectura individual
    return await Product.findById(id).populate('categoria', 'nombre descripcion');
  },

  // UPDATE
  updateProduct: async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true }).populate('categoria', 'nombre descripcion');
    return updatedProduct;
  },

  // DELETE
  deleteProduct: async (id) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
  }
};

module.exports = productService;