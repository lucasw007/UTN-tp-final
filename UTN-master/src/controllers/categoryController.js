// src/controllers/categoryController.js
const categoryService = require('../services/categoryService');

const categoryController = {
  // POST /api/categories
  create: async (req, res) => {
    try {
      const newCategory = await categoryService.createCategory(req.body);
      return res.status(201).json(newCategory); // 201 Created
    } catch (error) {
      // Manejo de errores de base de datos o validación (ej. unique)
      return res.status(400).json({ message: 'Error al crear la categoría.', error: error.message });
    }
  },

  // GET /api/categories
  findAll: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  // GET /api/categories/:id
  findById: async (req, res) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }
      return res.status(200).json(category);
    } catch (error) {
      // Puede ser un error de formato de ID (CastError)
      return res.status(400).json({ message: 'ID de categoría inválido.', error: error.message });
    }
  },

  // PUT /api/categories/:id
  update: async (req, res) => {
    try {
      const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Categoría no encontrada para actualizar.' });
      }
      return res.status(200).json(updatedCategory);
    } catch (error) {
      return res.status(400).json({ message: 'Error al actualizar la categoría.', error: error.message });
    }
  },

  // DELETE /api/categories/:id
  delete: async (req, res) => {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Categoría no encontrada para eliminar.' });
      }
      // 204 No Content es apropiado para una eliminación exitosa
      return res.status(204).send(); 
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la categoría.', error: error.message });
    }
  }
};

module.exports = categoryController;