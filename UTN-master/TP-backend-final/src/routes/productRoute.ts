import express from 'express';
import productController from '../controllers/productController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);

router.post('/', verifyToken, productController.create);
router.put('/:id', verifyToken, productController.update);
router.delete('/:id', verifyToken, productController.delete);

export default router;