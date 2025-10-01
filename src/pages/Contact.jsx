import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';

const Contact = () => {
  // Fetch dynamic contact details from backend
  const { data: contactDetails, loading: contactLoading } = useApi(() => ApiService.getContactDetails(), []);

  // Fallback contact info if API fails
  const fallbackContactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['(561) 376-2855', '954-324-1474'],
      links: ['tel:+15613762855', 'tel:+9543241474']
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['contact@thewhitebarnfl.com', 'info@cielofarmsnursery.com'],
      links: ['mailto:contact@thewhitebarnfl.com', 'mailto:info@cielofarmsnursery.com']
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['4680 SW 148th Ave.', 'Fort Lauderdale, FL 33330']
    },
    {
      icon: FaClock,
      title: 'Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: By Appointment']
    }
  ];

  // Use API data or fallback
  const contactInfo = contactDetails?.data ? [
    {
      icon: FaPhone,
      title: 'Phone',
      details: [
        contactDetails.data.phone || '(561) 376-2855', 
        contactDetails.data.emergencyContact || '954-324-1474'
      ].filter(Boolean),
      links: [
        contactDetails.data.phone || '15613762855',
        contactDetails.data.emergencyContact || '19543241474'
      ].filter(Boolean).map(phone => `tel:${phone.replace(/\D/g, '')}`)
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: [contactDetails.data.email || 'contact@thewhitebarnfl.com'],
      links: [`mailto:${contactDetails.data.email || 'contact@thewhitebarnfl.com'}`]
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: contactDetails.data.address 
        ? contactDetails.data.address.split(',').map(part => part.trim())
        : ['4680 SW 148th Ave.', 'Fort Lauderdale, FL 33330']
    },
    {
      icon: FaClock,
      title: 'Hours',
      details: contactDetails.data.hours 
        ? contactDetails.data.hours.split(',').map(part => part.trim())
        : ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: By Appointment']
    }
  ] : fallbackContactInfo;

  return (
    <div className="pt-20">
      {/* Page Title */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>Contact Us</span>
          </motion.nav>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">Get In Touch</h2>
            <p className="text-body max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, idx) => (
                    <div key={idx}>
                      {item.links && item.links[idx] ? (
                        <a
                          href={item.links[idx]}
                          className="text-gray-600 hover:text-primary-500 transition-colors block"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p className="text-gray-600">{detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-gray-900">
                  Send us a Message
                </h3>
                <p className="text-gray-600 mb-8">
                  Feel free to reach out to us for any inquiries about our venue, 
                  booking information, or to schedule a tour.
                </p>
                <ContactForm isFooter={false} />
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FaMapMarkerAlt className="text-4xl mb-2 mx-auto" />
                  <p>Interactive Map</p>
                  <p className="text-sm">4680 SW 148th Ave, Fort Lauderdale, FL 33330</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">
                  Planning Your Visit
                </h4>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Venue Tours:</strong> Available by appointment Monday through Friday. 
                    Weekend tours can be arranged upon request.
                  </p>
                  <p>
                    <strong>Consultation:</strong> We offer complimentary consultations to discuss 
                    your event needs and how we can make your vision come to life.
                  </p>
                  <p>
                    <strong>Response Time:</strong> We typically respond to inquiries within 24 hours 
                    during business days.
                  </p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gray-900 text-white p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">
                  Event Day Contact
                </h4>
                <p className="text-gray-300 mb-4">
                  For urgent matters on your event day, please use our emergency contact line:
                </p>
                <a
                  href="tel:+15613762855"
                  className="text-primary-400 text-lg font-semibold hover:text-primary-300 transition-colors"
                >
                  (561) 376-2855
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-body max-w-2xl mx-auto">
              Here are some common questions about our venue and services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What is the capacity of your venue?",
                answer: "Our venue can accommodate up to 150 guests for seated events and up to 200 for cocktail-style gatherings."
              },
              {
                question: "Do you provide catering services?",
                answer: "We work with preferred catering partners and can provide recommendations, or you may choose your own licensed caterer."
              },
              {
                question: "Is there parking available?",
                answer: "Yes, we have ample on-site parking for all your guests, including accessible parking spaces."
              },
              {
                question: "Can we have outdoor ceremonies?",
                answer: "Absolutely! Our beautiful gardens provide the perfect setting for outdoor ceremonies and receptions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h4>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
