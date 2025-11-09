import { Clock } from 'lucide-react';

export default function HotDeal() {
  const timeLeft = {
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl overflow-hidden my-12 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">Limited Time Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Mega Sale Event
          </h2>
          <p className="text-red-100 text-lg mb-6">
            Get up to 60% off on selected items. Hurry, stock is running out!
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors w-fit">
            Shop Now
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-red-100 text-sm uppercase mt-2">Days</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-red-100 text-sm uppercase mt-2">Hours</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-red-100 text-sm uppercase mt-2">Mins</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-red-100 text-sm uppercase mt-2">Secs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
