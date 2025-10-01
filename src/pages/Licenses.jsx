import { motion } from 'framer-motion';
import { FaCertificate, FaShieldAlt, FaCheckCircle, FaDownload } from 'react-icons/fa';

const Licenses = () => {
  const licenses = [
    {
      title: 'Business License',
      issuer: 'Broward County',
      number: 'BL-2024-001234',
      expiry: 'December 31, 2024',
      status: 'Active',
      description: 'Official business license for event venue operations'
    },
    {
      title: 'Food Service License',
      issuer: 'Florida Department of Health',
      number: 'FS-FL-567890',
      expiry: 'June 30, 2025',
      status: 'Active',
      description: 'Permits food service and catering operations'
    },
    {
      title: 'Liquor License',
      issuer: 'Florida Division of Alcoholic Beverages',
      number: 'LL-2024-789012',
      expiry: 'March 15, 2025',
      status: 'Active',
      description: 'Allows service of alcoholic beverages at events'
    },
    {
      title: 'Fire Safety Certificate',
      issuer: 'Broward County Fire Department',
      number: 'FS-BC-345678',
      expiry: 'September 30, 2024',
      status: 'Active',
      description: 'Certifies compliance with fire safety regulations'
    },
    {
      title: 'Occupancy Permit',
      issuer: 'City of Southwest Ranches',
      number: 'OP-SWR-901234',
      expiry: 'December 31, 2024',
      status: 'Active',
      description: 'Permits occupancy for up to 200 guests'
    },
    {
      title: 'Environmental Compliance',
      issuer: 'Florida Department of Environmental Protection',
      number: 'EC-FL-456789',
      expiry: 'August 31, 2025',
      status: 'Active',
      description: 'Environmental compliance for outdoor events'
    }
  ];

  const certifications = [
    {
      title: 'Wedding Planning Professional',
      organization: 'International Association of Wedding Professionals',
      year: '2023',
      icon: FaCertificate
    },
    {
      title: 'Event Safety Management',
      organization: 'Event Safety Alliance',
      year: '2024',
      icon: FaShieldAlt
    },
    {
      title: 'Sustainable Event Practices',
      organization: 'Green Event Certification',
      year: '2023',
      icon: FaCheckCircle
    }
  ];

  const insurancePolicies = [
    {
      type: 'General Liability Insurance',
      provider: 'ABC Insurance Company',
      coverage: '$2,000,000',
      expiry: 'January 31, 2025'
    },
    {
      type: 'Property Insurance',
      provider: 'XYZ Insurance Group',
      coverage: '$1,500,000',
      expiry: 'March 15, 2025'
    },
    {
      type: 'Liquor Liability Insurance',
      provider: 'DEF Insurance Services',
      coverage: '$1,000,000',
      expiry: 'June 30, 2025'
    }
  ];

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
            Licenses & Accreditations
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>Licenses & Accreditations</span>
          </motion.nav>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-6">Your Peace of Mind is Our Priority</h2>
            <p className="text-body max-w-3xl mx-auto">
              At The White Barn FL, we maintain all necessary licenses, certifications, and insurance 
              to ensure your event is safe, legal, and worry-free. Our commitment to compliance and 
              professional standards gives you confidence in choosing us for your special day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Licenses Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Current Licenses & Permits</h2>
            <p className="text-body max-w-2xl mx-auto">
              All our licenses are current and regularly renewed to ensure continuous compliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaCertificate className="text-primary-500 text-xl" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    license.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {license.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {license.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {license.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Issuer:</span>
                    <span className="text-gray-900">{license.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number:</span>
                    <span className="text-gray-900 font-mono">{license.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires:</span>
                    <span className="text-gray-900">{license.expiry}</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full flex items-center justify-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors">
                  <FaDownload size={14} />
                  <span className="text-sm font-medium">View Certificate</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Professional Certifications</h2>
            <p className="text-body max-w-2xl mx-auto">
              Our team holds professional certifications that demonstrate our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="text-primary-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {cert.title}
                </h3>
                <p className="text-gray-600 mb-2">{cert.organization}</p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Insurance Coverage</h2>
            <p className="text-body max-w-2xl mx-auto">
              Comprehensive insurance coverage protects your event and provides peace of mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {insurancePolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-secondary-500 text-xl" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {policy.type}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Provider:</span>
                    <span className="text-gray-900">{policy.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="text-gray-900 font-semibold">{policy.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires:</span>
                    <span className="text-gray-900">{policy.expiry}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-primary-50 p-8 rounded-lg text-center"
          >
            <FaCheckCircle className="text-primary-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-900">
              Fully Compliant & Insured
            </h2>
            <p className="text-body max-w-3xl mx-auto mb-6">
              We are committed to maintaining the highest standards of safety, legality, and 
              professionalism. All our licenses are current, our insurance is comprehensive, 
              and our team is professionally certified. You can trust us to handle your event 
              with complete compliance and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Request Documentation
              </button>
              <button className="btn-outline">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Need to Verify Our Credentials?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're happy to provide copies of any licenses or certificates for your records. 
              Contact us for verification or if you have any questions about our compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Request Documents
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all">
                Call Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Licenses;
