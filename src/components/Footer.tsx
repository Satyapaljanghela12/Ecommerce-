import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={18} />
                <span className="text-sm">+12 958 648 597</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={18} />
                <span className="text-sm">Shopcart@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About us</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact us</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-900">Help</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Gadget</a></li>
              <li><a href="#" className="hover:text-gray-900">Appliances</a></li>
              <li><a href="#" className="hover:text-gray-900">Refrigerators</a></li>
              <li><a href="#" className="hover:text-gray-900">Television</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive deals and updates
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 SHOPCART. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
