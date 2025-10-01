import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaGooglePlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const Footer = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      text: 'contact@thewhitebarnfl.com',
      href: 'mailto:contact@thewhitebarnfl.com'
    },
    {
      icon: FaPhone,
      text: '(561) 376-2855',
      href: 'tel:+15613762855'
    },
    {
      icon: FaMapMarkerAlt,
      text: '4680 SW 148th Ave. Fort Lauderdale, FL 33330'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaGooglePlus, href: '#', label: 'Google Plus' }
  ];

  const galleryImages = [
    '/images/gallery/gallery5.jpg',
    '/images/gallery/gallery6.jpg',
    '/images/gallery/gallery7.jpg',
    '/images/gallery/gallery8.jpg',
    '/images/gallery/gallery9.jpg',
    '/images/gallery/gallery10.jpg'
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-white/20 rounded-full animate-bounce-slow delay-1000"></div>
      </div>

      <div className="container-custom section-padding relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="text-primary-400 text-sm font-medium uppercase tracking-wider">
                Get in touch
              </span>
              <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
                Here's how to plan a wedding
              </h2>
            </div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <item.icon className="text-primary-400 mt-1 flex-shrink-0" />
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get Connected</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              COPYRIGHT © 2024 THE WHITE BARN FL - ALL RIGHTS RESERVED. | 
              Designed by{' '}
              <a 
                href="https://www.createonlineweb.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Create Online Web
              </a>
            </div>
            
            {/* The Knot Badge */}
            <div>
              <a 
                href="https://www.theknot.com/marketplace/redirect-2087518?utm_source=vendor_website&utm_medium=banner&utm_term=47516448-4b08-4fa8-9b95-d46541be9691&utm_campaign=vendor_badge_assets"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://d13ns7kbjmbjip.cloudfront.net/For_Your_Website/TK-badge_AsSeen.png"
                  alt="As Seen on The Knot"
                  width="120"
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
