// src/services/categoryService.js
const Category = require('../models/categoryModel');

const categoryService = {
  // CREATE
  createCategory: async (data) => {
    const newCategory = new Category(data);
    return await newCategory.save();
  },

  // READ ALL
  getAllCategories: async () => {
    return await Category.find();
  },

  // READ ONE
  getCategoryById: async (id) => {
    return await Category.findById(id);
  },

  // UPDATE
  updateCategory: async (id, data) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true }); // new: true devuelve el doc actualizado
    return updatedCategory;
  },

  // DELETE
  deleteCategory: async (id) => {
    const result = await Category.findByIdAndDelete(id);
    return result;
  }
};

module.exports = categoryService;