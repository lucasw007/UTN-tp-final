import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).json({ message: 'Token no proporcionado. Acceso denegado.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(403).json({ message: 'Formato de token inválido. Acceso denegado.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado. No autorizado.' });
  }
};

export default verifyToken;