import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const socialIcons = [
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
  { label: 'Tweeter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
  { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                  src="/images/sia-logo.png" 
                  alt="SIA Consulting Logo" 
                  className="h-30 w-auto object-contain"
                />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Empowering SMEs and communities through consultancy, training, and investment linkages for sustainable growth.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((icon, i) => (
                <a key={i} href="#" aria-label={icon.label} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-brand transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', to: '/' },
                { name: 'About Us', to: '/about' },
                { name: 'Services', to: '/services' },
                { name: 'Programs', to: '/programs' },
                { name: 'Training', to: '/training' },
                { name: 'Insights', to: '/insights' },
                { name: 'Contact Us', to: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="text-gray-300 text-sm hover:text-green-light transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold text-base mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {['Business Consultancy', 'Capacity Building', 'Investment Linkages', 'Logistics Support'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-gray-300 text-sm hover:text-green-light transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-green-light mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">Plot 305, Block K, Kigamboni, Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-green-light shrink-0" />
                <span className="text-gray-300 text-sm">+255 683 333 200</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-green-light shrink-0" />
                <span className="text-gray-300 text-sm">info@siaconsulting.co.tz</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe size={16} className="text-green-light shrink-0" />
                <span className="text-gray-300 text-sm">www.siaconsulting.co.tz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-gray-400 text-sm">© 2026 SIA Consulting Dynamics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
