import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  toggleAvailability,
  updateProduct,
  updateStock,
  getProductsAdmin
} from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/admin/all', protect, adminOnly, getProductsAdmin);
router.get('/:id', getProductById);

router.post('/', protect, adminOnly, upload.array('images', 7), createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 7), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.patch('/:id/stock', protect, adminOnly, updateStock);
router.patch('/:id/toggle', protect, adminOnly, toggleAvailability);

export default router;

