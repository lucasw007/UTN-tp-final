const productService = require('../services/productService.js');

const productController = {
  // POST /api/products
  create: async (req, res) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ message: 'Error al crear el producto.', error: error.message });
    }
  },

  // GET /api/products
  findAll: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  // GET /api/products/:id
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
  },

  // PUT /api/products/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await productService.updateProduct(id, req.body);
      if (!updated) return res.status(404).json({ message: 'Producto no encontrado.' });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ message: 'Error al actualizar el producto.', error: error.message });
    }
  },

  // DELETE /api/products/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      if (!deleted) return res.status(404).json({ message: 'Producto no encontrado.' });
      return res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar el producto.', error: error.message });
    }
  }
};

module.exports = productController;