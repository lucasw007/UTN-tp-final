import { Request, Response } from 'express';
import userService from '../services/userService';
import { ValidationError } from '../utils/errorTypes';

const userController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      // Validations
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        throw new ValidationError('El nombre es requerido y debe tener al menos 2 caracteres.');
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ValidationError('Email inválido.');
      }
      if (!password || password.length < 6) {
        throw new ValidationError('La contraseña debe tener al menos 6 caracteres.');
      }

      const newUser = await userService.registerUser({ name: name.trim(), email: email.toLowerCase(), password });
      const { password: _, ...userData } = newUser.toObject();
      res.status(201).json({ message: 'Usuario registrado exitosamente.', user: userData });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(400).json({ message: 'El email ya está registrado.' });
        return;
      }
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'Datos de registro inválidos.', error: error.message });
        return;
      }
      res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Se requieren email y contraseña.' });
      return;
    }

    try {
      const authResult = await userService.loginUser(email.toLowerCase(), password);
      if (!authResult) {
        res.status(401).json({ message: 'Credenciales inválidas.' });
        return;
      }

      res.status(200).json({
        message: 'Inicio de sesión exitoso.',
        token: authResult.token,
        userId: authResult.userId,
        email: authResult.email,
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor durante el login.', error: error.message });
    }
  }
};

export default userController;