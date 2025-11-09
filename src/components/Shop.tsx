import { ShoppingBag, Truck, RotateCcw, Lock } from 'lucide-react';

interface ShopFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Shop() {
  const features: ShopFeature[] = [
    {
      id: '1',
      icon: <ShoppingBag className="w-10 h-10" />,
      title: 'Wide Selection',
      description: 'Browse thousands of products across multiple categories to find exactly what you need.',
    },
    {
      id: '2',
      icon: <Truck className="w-10 h-10" />,
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly with our reliable shipping partners.',
    },
    {
      id: '3',
      icon: <RotateCcw className="w-10 h-10" />,
      title: 'Easy Returns',
      description: '30-day money-back guarantee. Shop with confidence knowing returns are hassle-free.',
    },
    {
      id: '4',
      icon: <Lock className="w-10 h-10" />,
      title: 'Secure Payment',
      description: 'Your payments are protected with industry-leading encryption technology.',
    },
  ];

  return (
    <section className="my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We're committed to providing the best shopping experience with quality products, great prices, and exceptional customer service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow text-center"
          >
            <div className="flex justify-center mb-4 text-green-600">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 md:p-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
            <p className="text-gray-700">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
            <p className="text-gray-700">Products Available</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
            <p className="text-gray-700">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
