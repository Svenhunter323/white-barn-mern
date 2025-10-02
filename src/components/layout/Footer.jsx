import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import toast from 'react-hot-toast';

const Footer = () => {
  const [contactData, setContactData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch contact data and social links
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      // This would be replaced with actual API calls
      setContactData({
        phone: '(555) 123-4567',
        email: 'info@thewhitebarnfl.com',
        address: '123 Barn Road, Florida, FL 12345'
      });
      
      setSocialLinks([
        { name: 'Facebook', url: '#', icon: 'facebook' },
        { name: 'Instagram', url: '#', icon: 'instagram' },
        { name: 'Twitter', url: '#', icon: 'twitter' }
      ]);
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);
    try {
      // Newsletter subscription logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Wedding Venues',
    'Corporate Events',
    'Private Parties',
    'Photography Sessions'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with Our Latest Events
              </h3>
              <p className="text-lg mb-8 opacity-90">
                Subscribe to our newsletter for exclusive updates and special offers
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    required
                  />
                  <Button 
                    type="submit" 
                    loading={isSubmitting}
                    className="bg-white text-amber-600 hover:bg-white/90"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">WB</span>
                </div>
                <span className="font-bold text-lg">The White Barn FL</span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Creating unforgettable moments in our beautiful rustic venue. 
                Your perfect event starts here.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <i className={`fab fa-${social.icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
              {contactData && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
                    <span className="text-gray-300 text-sm">{contactData.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-phone text-amber-500"></i>
                    <a 
                      href={`tel:${contactData.phone}`}
                      className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-envelope text-amber-500"></i>
                    <a 
                      href={`mailto:${contactData.email}`}
                      className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The White Barn FL. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
