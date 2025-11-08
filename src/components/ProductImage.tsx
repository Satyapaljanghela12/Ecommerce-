import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

type ProductImageProps = {
  productId: string;
  productName: string;
  className?: string;
};

export default function ProductImage({ productId, productName, className = '' }: ProductImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadImage = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', productId)
        .order('display_order', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setImageUrl(data?.image_url || null);
    } catch (error) {
      console.error('Error loading product image:', error);
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  if (loading) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-green-600 border-r-transparent"></div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-6xl">📱</div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${className}`}
    />
  );
}
