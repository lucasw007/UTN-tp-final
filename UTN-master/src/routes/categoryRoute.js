const express = require('express');
const router = express.Router(); // <--- Verificación
const categoryController = require('../controllers/categoryController.js');
const verifyToken = require('../middleware/verifyToken.js')

// Rutas públicas (GET)
router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findById);

// Rutas protegidas (Requieren JWT)
router.post('/', verifyToken, categoryController.create);
router.put('/:id', verifyToken, categoryController.update);
router.delete('/:id', verifyToken, categoryController.delete);

module.exports = router;