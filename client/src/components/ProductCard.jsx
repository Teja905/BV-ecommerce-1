import { Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div className="bg-white rounded-lg shadow-card hover:-translate-y-1 transition p-3 flex flex-col gap-3">
      <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-md bg-slate-50">
        <img src={product.images?.[0]} alt={product.name} className="h-48 w-full object-cover transition hover:scale-105" />
      </Link>
      <div className="flex-1 flex flex-col gap-2">
        <Link to={`/product/${product._id}`} className="font-semibold text-slate-800">
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand">${finalPrice.toFixed(2)}</span>
          {product.discount > 0 && <span className="text-sm text-slate-500 line-through">${product.price.toFixed(2)}</span>}
          {product.discount > 0 && <span className="text-xs bg-brand-gold px-2 py-1 rounded-full text-slate-900 font-semibold">-{product.discount}%</span>}
        </div>
        <div className="flex items-center gap-1 text-amber-500 text-sm">
          <Star size={16} fill="#f59e0b" />
          <span>{product.rating?.toFixed(1)}</span>
          <span className="text-slate-500">({product.stock} left)</span>
        </div>
      </div>
      <button
        onClick={() => addItem(product, 1)}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white py-2 rounded-md hover:bg-brand/90 transition"
      >
        <ShoppingBag size={18} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

