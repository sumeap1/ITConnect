import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center md:items-start">
        {/* Grid për kolonat */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="font-playfair text-xl font-bold mb-4">IT Conect</h3>
            <p className="text-gray-400">
              Connecting top tech talent with innovative companies in Kosovo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/for-companies" className="text-gray-400 hover:text-white">For Companies</Link></li>
              <li><Link to="/for-developers" className="text-gray-400 hover:text-white">For Developers</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Copy footer bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 w-full text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} IT Conect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
