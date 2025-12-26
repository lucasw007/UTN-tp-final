import { Request, Response } from 'express';
import productService from '../services/productService';
import { ValidationError } from '../utils/errorTypes';

const productController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, descripcion, precio, stock, categoria } = req.body;

      // Validations
      if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 1) {
        throw new ValidationError('El nombre es requerido.');
      }
      if (!descripcion || typeof descripcion !== 'string') {
        throw new ValidationError('La descripción es requerida.');
      }
      if (typeof precio !== 'number' || precio < 0) {
        throw new ValidationError('El precio debe ser un número positivo.');
      }
      if (typeof stock !== 'number' || stock < 0) {
        throw new ValidationError('El stock debe ser un número positivo.');
      }
      if (!categoria || typeof categoria !== 'string') {
        throw new ValidationError('La categoría es requerida.');
      }

      const newProduct = await productService.createProduct({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio,
        stock,
        categoria
      });
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al crear el producto.', error: error.message });
    }
  },

  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { categoria, precioMin, precioMax, nombre } = req.query;
      const filters: any = {};

      if (categoria) filters.categoria = categoria;
      if (precioMin) filters.precioMin = parseFloat(precioMin as string);
      if (precioMax) filters.precioMax = parseFloat(precioMax as string);
      if (nombre) filters.nombre = nombre as string;

      const products = await productService.getAllProducts(filters);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  findById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado.' });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock, categoria } = req.body;

      // Validations
      if (nombre && (typeof nombre !== 'string' || nombre.trim().length < 1)) {
        throw new ValidationError('El nombre debe ser una cadena no vacía.');
      }
      if (descripcion && typeof descripcion !== 'string') {
        throw new ValidationError('La descripción debe ser una cadena.');
      }
      if (precio !== undefined && (typeof precio !== 'number' || precio < 0)) {
        throw new ValidationError('El precio debe ser un número positivo.');
      }
      if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
        throw new ValidationError('El stock debe ser un número positivo.');
      }
      if (categoria && typeof categoria !== 'string') {
        throw new ValidationError('La categoría debe ser una cadena.');
      }

      const data: any = {};
      if (nombre) data.nombre = nombre.trim();
      if (descripcion) data.descripcion = descripcion.trim();
      if (precio !== undefined) data.precio = precio;
      if (stock !== undefined) data.stock = stock;
      if (categoria) data.categoria = categoria;

      const updated = await productService.updateProduct(id, data);
      if (!updated) {
        res.status(404).json({ message: 'Producto no encontrado.' });
        return;
      }
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al actualizar el producto.', error: error.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      if (!deleted) {
        res.status(404).json({ message: 'Producto no encontrado.' });
        return;
      }
      res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar el producto.', error: error.message });
    }
  }
};

export default productController;