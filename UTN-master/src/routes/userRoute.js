// src/routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de Autenticación (Públicas)
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;