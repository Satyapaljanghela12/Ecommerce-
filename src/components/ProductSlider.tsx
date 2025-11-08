import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import type { Product } from '../lib/supabase';
import ProductImage from './ProductImage';

type ProductSliderProps = {
  products: Product[];
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
};

export default function ProductSlider({
  products,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  isInWishlist,
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else if (window.innerWidth < 1280) setItemsPerView(3);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - itemsPerView + 1));
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [products.length, itemsPerView]);

  const handlePrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - itemsPerView + 1)) % Math.max(1, products.length - itemsPerView + 1));
  };

  const handleNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - itemsPerView + 1));
  };

  if (products.length === 0) return null;

  const maxIndex = Math.max(1, products.length - itemsPerView + 1);

  return (
    <div className="relative bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 sm:p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Featured Products
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex-shrink-0 ${
                itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : itemsPerView === 3 ? 'w-1/3' : 'w-1/4'
              }`}
            >
              <SliderCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onProductClick={onProductClick}
                isInWishlist={isInWishlist(product.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (autoPlayRef.current) clearInterval(autoPlayRef.current);
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function SliderCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  isInWishlist,
}: {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: boolean;
}) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 relative group h-full flex flex-col">
      {product.badge && (
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md z-10 font-medium">
          {product.badge}
        </span>
      )}

      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-10 transition-all duration-200"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isInWishlist ? '#ef4444' : 'none'}
          stroke={isInWishlist ? '#ef4444' : '#9ca3af'}
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <button
        onClick={() => onProductClick(product)}
        className="w-full aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden hover:bg-gray-200 transition-colors cursor-pointer group-hover:scale-105 duration-300"
      >
        <ProductImage
          productId={product.id}
          productName={product.name}
          className="rounded-lg"
        />
      </button>

      <div className="flex-1 flex flex-col">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
          Gadget Accessories
        </p>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[40px] mt-1">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 my-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.review_count})
          </span>
        </div>

        <div className="flex items-center justify-between my-3">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">
                ${product.original_price!.toFixed(2)}
              </p>
            )}
          </div>
          {hasDiscount && (
            <span className="text-xs text-white font-semibold bg-orange-500 px-2 py-1 rounded">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <p className="text-xs text-gray-600 mb-3">
          Stock: <span className="font-medium">{product.stock}</span>
        </p>

        <button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group/btn hover:shadow-lg"
        >
          <ShoppingCart size={16} className="group-hover/btn:animate-pulse" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
