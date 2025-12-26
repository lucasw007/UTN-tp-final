import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { errorLogger, errorHandler, notFoundHandler } from './middleware/errorHandler';

import categoryRoutes from './routes/categoryRoute';
import productRoutes from './routes/productRoute';
import userRoutes from './routes/userRoute';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Logger
app.use(morgan('combined'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API RESTful funcionando. Visita /api/v1/ para los endpoints.' });
});

const apiRouter = express.Router();
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/auth', authLimiter, userRoutes);

app.use('/api/v1', apiRouter);

app.use(errorLogger);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`📡 Servidor escuchando en http://localhost:${PORT}`);
  console.log('✅ MongoDB conectado exitosamente');
});