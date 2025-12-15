import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

