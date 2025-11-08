import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import ProductImage from './ProductImage';

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [products.length]);

  async function loadFeaturedProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-8">
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Grab Upto 50% Off On<br />Selected Products
            </h2>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
              <div className="text-6xl">🛍️</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getDiscountInfo = (product: Product) => {
    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercentage = hasDiscount
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : 0;
    return { hasDiscount, discountPercentage };
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden group">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex transition-all duration-700 ease-in-out">
            {products.map((product, index) => {
              const { hasDiscount, discountPercentage } = getDiscountInfo(product);
              return (
              <div
                key={product.id}
                className={`w-full flex-shrink-0 transition-all duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-6 text-center md:text-left">
                    {product.badge && (
                      <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md animate-pulse">
                        {product.badge}
                      </div>
                    )}

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {hasDiscount ? (
                        <>
                          Grab Upto {discountPercentage}% Off On<br />
                          <span className="text-green-600">{product.name}</span>
                        </>
                      ) : (
                        <>
                          Featured Deal<br />
                          <span className="text-green-600">{product.name}</span>
                        </>
                      )}
                    </h2>

                    <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
                      {product.description || 'Premium quality product with excellent features and performance.'}
                    </p>

                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="space-y-1">
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                        {hasDiscount && product.original_price && (
                          <p className="text-lg text-gray-500 line-through">
                            ${product.original_price.toFixed(2)}
                          </p>
                        )}
                      </div>
                      {hasDiscount && product.original_price && (
                        <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                          Save ${(product.original_price - product.price).toFixed(2)}
                        </div>
                      )}
                    </div>

                    <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                      Buy Now
                    </button>

                    <div className="flex items-center gap-2 justify-center md:justify-start text-sm text-gray-600">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="font-medium">
                        {product.rating} ({product.review_count} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex justify-center items-center">
                    <div className="relative w-full max-w-md aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-orange-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                      <div className="relative w-full h-full bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                        <ProductImage
                          productId={product.id}
                          productName={product.name}
                          className="rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-gray-900" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-10 h-3 bg-green-600 shadow-md'
                : 'w-3 h-3 bg-white bg-opacity-60 hover:bg-opacity-100 hover:scale-125'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
