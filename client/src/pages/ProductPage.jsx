import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import api from '../services/api';
import { useCart } from '../context/CartContext.jsx';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center py-10 text-slate-500">Loading...</p>;

  const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Swiper
          loop
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
          className="h-96 rounded-lg overflow-hidden bg-white shadow-card"
        >
          {product.images?.map((img) => (
            <SwiperSlide key={img}>
              <img src={img} alt={product.name} className="w-full h-96 object-cover hover:scale-105 transition" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop
            slidesPerView={4}
            spaceBetween={10}
            modules={[Thumbs]}
            watchSlidesProgress
          >
            {product.images?.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} alt="thumb" className="h-20 w-full object-cover rounded-md border border-slate-200" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
        <div>
          <p className="text-sm uppercase text-slate-500">{product.category}</p>
          <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl font-bold text-brand">${finalPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-slate-400 line-through">${product.price.toFixed(2)}</span>
                <span className="text-sm bg-brand-gold text-slate-900 px-2 py-1 rounded-full font-semibold">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed">{product.description}</p>
        <p className={`font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
          {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-slate-200 rounded-md">
            <button className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-16 text-center outline-none border-x border-slate-200 py-2"
            />
            <button className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <button
            className="flex-1 bg-brand text-white py-3 rounded-md font-semibold hover:bg-brand/90"
            onClick={() => addItem(product, qty)}
          >
            Add to Cart
          </button>
          <button className="flex-1 bg-brand-gold text-slate-900 py-3 rounded-md font-semibold hover:brightness-95">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

