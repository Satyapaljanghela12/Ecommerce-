import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../lib/supabase';
import ProductImage from './ProductImage';

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: boolean;
};

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  isInWishlist,
}: ProductCardProps) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative group">
      {product.badge && (
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md z-10">
          {product.badge}
        </span>
      )}

      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 z-10"
      >
        <Heart
          size={18}
          className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}
        />
      </button>

      <button
        onClick={() => onProductClick(product)}
        className="w-full aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <ProductImage
          productId={product.id}
          productName={product.name}
          className="rounded-lg"
        />
      </button>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase">GADGET ACCESSORIES</p>
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.review_count} Reviews
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ${product.original_price!.toFixed(2)}
              </p>
            )}
          </div>
          {hasDiscount && (
            <span className="text-xs text-orange-600 font-medium">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>In Stock: {product.stock}</span>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
