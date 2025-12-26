import express from 'express';
import categoryController from '../controllers/categoryController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findById);

router.post('/', verifyToken, categoryController.create);
router.put('/:id', verifyToken, categoryController.update);
router.delete('/:id', verifyToken, categoryController.delete);

export default router;