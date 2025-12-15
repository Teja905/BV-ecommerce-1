import fs from 'fs';
import path from 'path';
import Product from '../models/Product.js';
import { initCloudinary, uploadToCloudinary } from '../utils/cloudinary.js';

const useCloud = initCloudinary();

const buildImagePaths = async (files = []) => {
  const uploads = [];
  for (const file of files) {
    if (useCloud) {
      const upload = await uploadToCloudinary(file.path);
      uploads.push(upload.secure_url);
      fs.unlinkSync(file.path);
    } else {
      const relPath = path.relative(process.cwd(), file.path);
      uploads.push(`/${relPath.replace(/\\/g, '/')}`);
    }
  }
  return uploads;
};

export const getProducts = async (req, res) => {
  const { q } = req.query;
  const query = q ? { name: { $regex: q, $options: 'i' }, isActive: true } : { isActive: true };
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductsAdmin = async (req, res) => {
  const { q } = req.query;
  const query = q ? { name: { $regex: q, $options: 'i' } } : {};
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, discount, description, category, stock, isActive } = req.body;
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const images = await buildImagePaths(req.files);
  const product = await Product.create({
    name,
    price,
    discount: discount || 0,
    description,
    category,
    stock: stock || 0,
    isActive: isActive !== undefined ? isActive : true,
    images
  });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const updates = req.body;
  if (req.files && req.files.length) {
    const newImages = await buildImagePaths(req.files);
    product.images = newImages;
  }

  Object.assign(product, updates);
  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};

export const updateStock = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.stock = req.body.stock ?? product.stock;
  await product.save();
  res.json(product);
};

export const toggleAvailability = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.isActive = !product.isActive;
  await product.save();
  res.json(product);
};

