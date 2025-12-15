import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateQuantity);
router.delete('/', protect, removeFromCart);

export default router;

