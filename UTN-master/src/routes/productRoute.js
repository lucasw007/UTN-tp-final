// src/routes/productRoute.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

// Validate controller before registering routes
if (
  !productController ||
  typeof productController.findAll !== 'function' ||
  typeof productController.findById !== 'function' ||
  typeof productController.create !== 'function' ||
  typeof productController.update !== 'function' ||
  typeof productController.delete !== 'function'
) {
  console.error('Invalid productController export:', productController);
  throw new Error('productController is missing expected functions. Check src/controllers/productController.js exports.');
}

// Rutas públicas (GET)
router.get('/', productController.findAll);
router.get('/:id', productController.findById);

// Rutas protegidas (Requieren JWT)
router.post('/', verifyToken, productController.create);
router.put('/:id', verifyToken, productController.update);
router.delete('/:id', verifyToken, productController.delete);

module.exports = router;