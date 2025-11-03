export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grab Upto 50% Off On<br />Selected Headphone
          </h2>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Buy Now
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <div className="text-6xl">🎧</div>
          </div>
        </div>
      </div>
    </div>
  );
}
