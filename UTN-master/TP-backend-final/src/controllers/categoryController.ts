import { Request, Response } from 'express';
import categoryService from '../services/categoryService';
import { ValidationError } from '../utils/errorTypes';

const categoryController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, descripcion } = req.body;

      // Validations
      if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 1) {
        throw new ValidationError('El nombre es requerido.');
      }
      if (descripcion && typeof descripcion !== 'string') {
        throw new ValidationError('La descripción debe ser una cadena.');
      }

      const newCategory = await categoryService.createCategory({
        nombre: nombre.trim(),
        descripcion: descripcion ? descripcion.trim() : undefined
      });
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al crear la categoría.', error: error.message });
    }
  },

  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        res.status(404).json({ message: 'Categoría no encontrada.' });
        return;
      }
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ message: 'ID de categoría inválido.', error: error.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, descripcion } = req.body;

      // Validations
      if (nombre && (typeof nombre !== 'string' || nombre.trim().length < 1)) {
        throw new ValidationError('El nombre debe ser una cadena no vacía.');
      }
      if (descripcion && typeof descripcion !== 'string') {
        throw new ValidationError('La descripción debe ser una cadena.');
      }

      const data: any = {};
      if (nombre) data.nombre = nombre.trim();
      if (descripcion !== undefined) data.descripcion = descripcion ? descripcion.trim() : '';

      const updatedCategory = await categoryService.updateCategory(req.params.id, data);
      if (!updatedCategory) {
        res.status(404).json({ message: 'Categoría no encontrada para actualizar.' });
        return;
      }
      res.status(200).json(updatedCategory);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al actualizar la categoría.', error: error.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      if (!result) {
        res.status(404).json({ message: 'Categoría no encontrada para eliminar.' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar la categoría.', error: error.message });
    }
  }
};

export default categoryController;