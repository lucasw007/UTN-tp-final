import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Rutas de Autenticación (Públicas)
router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;