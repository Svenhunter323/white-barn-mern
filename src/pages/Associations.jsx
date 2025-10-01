import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaLeaf, FaPaw } from 'react-icons/fa';

const Associations = () => {
  const associations = [
    {
      name: 'March of Dimes',
      logo: '/images/marchofdimes.jpg',
      description: 'Supporting premature birth research and healthy pregnancies',
      mission: 'We partner with March of Dimes to support their mission of improving the health of mothers and babies.',
      website: 'https://www.marchofdimes.org',
      icon: FaHeart,
      category: 'Health & Wellness'
    },
    {
      name: 'St. Jude Children\'s Research Hospital',
      logo: '/images/stjude.jpg',
      description: 'Fighting childhood cancer and pediatric diseases',
      mission: 'We believe in St. Jude\'s mission to find cures and save children, and we\'re proud to support their work.',
      website: 'https://www.stjude.org',
      icon: FaHeart,
      category: 'Healthcare'
    },
    {
      name: 'Humane Society',
      logo: '/images/humanesociety.jpg',
      description: 'Animal welfare and protection organization',
      mission: 'We support the Humane Society\'s efforts to protect animals and promote compassionate treatment.',
      website: 'https://www.humanesociety.org',
      icon: FaPaw,
      category: 'Animal Welfare'
    },
    {
      name: 'Make-A-Wish Foundation',
      logo: '/images/wish.jpg',
      description: 'Granting wishes for children with critical illnesses',
      mission: 'We help make dreams come true by supporting Make-A-Wish in their mission to grant wishes.',
      website: 'https://www.wish.org',
      icon: FaHeart,
      category: 'Children\'s Charity'
    },
    {
      name: 'Broward Clean Air',
      logo: '/images/browardcleanair.jpg',
      description: 'Environmental protection and clean air initiatives',
      mission: 'We\'re committed to environmental responsibility and support clean air initiatives in our community.',
      website: '#',
      icon: FaLeaf,
      category: 'Environmental'
    },
    {
      name: 'Rainbow Guardian',
      logo: '/images/rainbowguardian.jpg',
      description: 'Supporting LGBTQ+ youth and families',
      mission: 'We believe in equality and support organizations that protect and empower LGBTQ+ individuals.',
      website: '#',
      icon: FaHandsHelping,
      category: 'Social Justice'
    }
  ];

  const values = [
    {
      title: 'Community Support',
      description: 'We believe in giving back to the communities that support us.',
      icon: FaHandsHelping
    },
    {
      title: 'Health & Wellness',
      description: 'Supporting organizations that promote health and well-being for all.',
      icon: FaHeart
    },
    {
      title: 'Environmental Responsibility',
      description: 'Committed to protecting our environment for future generations.',
      icon: FaLeaf
    },
    {
      title: 'Animal Welfare',
      description: 'Advocating for the protection and humane treatment of animals.',
      icon: FaPaw
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
            Associations We Believe In
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>Associations We Believe In</span>
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
            <h2 className="heading-secondary mb-6">Our Commitment to Making a Difference</h2>
            <p className="text-body max-w-4xl mx-auto">
              At The White Barn FL, we believe that success comes with responsibility. We're proud to 
              support organizations that align with our values and make a positive impact in our 
              community and beyond. These partnerships reflect our commitment to causes that matter 
              to us and our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Our Core Values</h2>
            <p className="text-body max-w-2xl mx-auto">
              These values guide our partnerships and charitable giving decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-primary-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Associations Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Organizations We Support</h2>
            <p className="text-body max-w-2xl mx-auto">
              We're honored to partner with these incredible organizations that are making a real difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {associations.map((association, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={association.logo}
                    alt={association.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {association.name}
                    </h3>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {association.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {association.description}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 text-sm italic">
                      "{association.mission}"
                    </p>
                  </div>
                  
                  {association.website !== '#' && (
                    <a
                      href={association.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">How We Make a Difference</h2>
            <p className="text-body max-w-2xl mx-auto">
              Our support goes beyond financial contributions - we actively participate in making positive change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Financial Support
              </h3>
              <p className="text-gray-600">
                We donate a percentage of our profits to support the missions of our partner organizations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandsHelping className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Volunteer Time
              </h3>
              <p className="text-gray-600">
                Our team volunteers time and skills to help with events, fundraisers, and awareness campaigns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Awareness & Advocacy
              </h3>
              <p className="text-gray-600">
                We use our platform to raise awareness about important causes and encourage others to get involved.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Involvement */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="heading-secondary mb-6">Join Us in Making a Difference</h2>
              <p className="text-body mb-6">
                We believe that celebrations should also be opportunities to give back. Many of our 
                clients choose to incorporate charitable giving into their events, whether through 
                donation drives, awareness campaigns, or dedicating their celebration to a cause 
                they care about.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Charity Wedding Registries:</strong> Instead of gifts, couples can ask 
                    guests to donate to their favorite charity.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Awareness Events:</strong> Corporate events that highlight important 
                    causes and encourage employee involvement.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Fundraising Celebrations:</strong> Events specifically designed to 
                    raise funds for charitable organizations.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-900">
                Want to Get Involved?
              </h3>
              <p className="text-gray-600 mb-6">
                If you're planning an event and would like to incorporate charitable giving or 
                awareness, we'd love to help you make it happen. We can connect you with our 
                partner organizations or help you support a cause that's close to your heart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  Plan a Charity Event
                </button>
                <button className="btn-outline">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Celebrate with Purpose
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create an event that not only celebrates your special moment but also makes 
              a positive impact. Contact us to learn how we can help you give back through your celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Start Planning
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Associations;
