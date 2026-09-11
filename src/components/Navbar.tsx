import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Programs', path: '/programs' },
  { name: 'Training', path: '/training' },
  { name: 'Insights', path: '/insights' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="/images/sia-logo.png" 
              alt="SIA Consulting Logo" 
              className="h-30 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  location.pathname === link.path
                    ? 'text-green-brand border-b-2 border-green-brand'
                    : 'text-navy hover:text-green-brand'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:inline-block bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-navy-light transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-navy p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-gray-100 ${
                location.pathname === link.path
                  ? 'text-green-brand'
                  : 'text-navy'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block text-center bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
