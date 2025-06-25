import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-ivory border-b border-stone/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-playfair text-2xl font-bold text-charcoal">
            IT Conect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-stone hover:text-charcoal">
              How It Works
            </Link>
            <Link to="/for-companies" className="text-stone hover:text-charcoal">
              For Companies
            </Link>
            <Link to="/for-developers" className="text-stone hover:text-charcoal">
              For Developers
            </Link>
            <Link to="/about" className="text-stone hover:text-charcoal">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-charcoal hover:text-stone focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col space-y-4">
              <Link
                to="/how-it-works"
                className="text-stone hover:text-charcoal"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/for-companies"
                className="text-stone hover:text-charcoal"
                onClick={() => setIsOpen(false)}
              >
                For Companies
              </Link>
              <Link
                to="/for-developers"
                className="text-stone hover:text-charcoal"
                onClick={() => setIsOpen(false)}
              >
                For Developers
              </Link>
              <Link
                to="/about"
                className="text-stone hover:text-charcoal"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 