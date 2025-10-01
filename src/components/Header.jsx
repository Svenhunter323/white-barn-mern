import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Videos', href: '/videos' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Licenses & Accreditations', href: '/licenses' },
    { name: 'Associations We Believe In', href: '/associations' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const contactInfo = [
    { icon: FaPhone, text: '954-324-1474', href: 'tel:+9543241474' },
    { icon: FaEnvelope, text: 'info@cielofarmsnursery.com', href: 'mailto:info@cielofarmsnursery.com' },
    { icon: FaMapMarkerAlt, text: '4680 Volunteer Road SW Ranches, FL 33330' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/images/logo.png" 
              alt="The White Barn FL" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-16'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 ${
                  location.pathname === item.href
                    ? 'text-primary-500'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 transition-colors"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-lg"
          >
            <div className="container-custom py-4">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium transition-colors duration-200 hover:text-primary-500 ${
                      location.pathname === item.href
                        ? 'text-primary-500'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                    <item.icon className="text-primary-500" />
                    {item.href ? (
                      <a href={item.href} className="hover:text-primary-500 transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
