import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorTypes';

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('\nError Stack:', err.stack);
  console.error('Error Message:', err.message);
  console.error('Error Name:', err.name);
  next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'error',
      type: 'ValidationError',
      message: 'Error de validación',
      details: Object.values(err.errors).map((error: any) => ({
        field: error.path,
        message: error.message
      }))
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      status: 'error',
      type: 'CastError',
      message: 'ID inválido',
      details: err.message
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.status).json({
      status: 'error',
      type: err.name,
      message: err.message
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      status: 'error',
      type: 'AuthenticationError',
      message: 'Token inválido'
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      status: 'error',
      type: 'AuthenticationError',
      message: 'Token expirado'
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    type: 'InternalServerError',
    message: 'Error interno del servidor'
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'error',
    type: 'NotFoundError',
    message: 'Ruta no encontrada'
  });
};