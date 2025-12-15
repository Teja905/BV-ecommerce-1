import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  res.json(cart || { user: req.user._id, items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (!product.isActive) return res.status(400).json({ message: 'Product unavailable' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = new Cart({ user: req.user._id, items: [] });

  const existing = cart.items.find((i) => i.product.toString() === productId);
  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity
    });
  }

  await cart.save();
  res.status(201).json(cart);
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = Math.max(1, Number(quantity));
  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};

