import type { Category } from '../lib/supabase';

type CategorySectionProps = {
  categories: Category[];
};

const categoryIcons: Record<string, string> = {
  'kitchen-appliances': '☕',
  'television': '📺',
  'refrigerators': '🧊',
  'tablets': '📱',
  'washing-machine': '🌀',
  'gadget-accessories': '🎧',
};

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="text-4xl mb-2">
              {categoryIcons[category.slug] || '📦'}
            </div>
            <h3 className="text-sm font-medium text-gray-900 text-center mb-1">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">
              ({category.items_available}) Items Available
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
