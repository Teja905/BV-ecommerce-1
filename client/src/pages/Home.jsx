import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../services/api';
import ProductCard from '../components/ProductCard.jsx';

const heroImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1542293787938-4d273c37c5d1?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1400&q=80'
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products', { params: { q } });
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} loop className="h-72">
          {heroImages.map((img) => (
            <SwiperSlide key={img}>
              <img src={img} alt="Hero" className="w-full h-72 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Featured Products</h2>
          {q && <p className="text-slate-500 text-sm mt-1">Search results for "{q}"</p>}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
          {products.length === 0 && <p className="text-slate-500">No products found.</p>}
        </div>
      )}
    </div>
  );
};

export default Home;

