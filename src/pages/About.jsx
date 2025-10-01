import { motion } from 'framer-motion';

const About = () => {
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
            About Us
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>About Us</span>
          </motion.nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Gina Rodriguez Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/event-1.jpg"
                    alt="Gina Rodriguez"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-900">
                    Gina Rodriguez
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Working alongside Mike, Gina ensures that every event at The White Barn FL 
                    is unique and enchanting, providing visitors with unforgettable experiences 
                    in a beautifully serene setting.
                  </p>
                  <button className="btn-primary">
                    Get In Touch
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="space-y-8">
                {/* About The White Barn FL */}
                <div>
                  <h2 className="heading-secondary mb-6">
                    About The White Barn FL
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-6">
                      The White Barn FL is a premier wedding and event venue located in the heart 
                      of Southwest Ranches, Florida. Our family-owned business sits on 4.95 acres 
                      of botanical paradise, featuring colorful gardens with lush, beautiful flowers 
                      and trees that create the perfect backdrop for your special day.
                    </p>
                    
                    <p className="mb-6">
                      What sets us apart is our unique combination of natural beauty and elegant 
                      facilities. Our upscale venue specializes in creating unforgettable experiences 
                      for weddings, corporate events, private parties, and social gatherings. We 
                      believe that every event should be as unique as the people celebrating it.
                    </p>

                    <p className="mb-6">
                      Our venue features an assortment of colorful bougainvilleas and includes an 
                      indoor plant showroom with beautiful bromeliads. This creates a truly unique 
                      atmosphere that blends the beauty of nature with sophisticated event spaces.
                    </p>
                  </div>
                </div>

                {/* Our Mission */}
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-900">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    At The White Barn FL, our mission is to provide an exceptional venue experience 
                    that exceeds your expectations. We are committed to helping you create beautiful, 
                    memorable events in our stunning natural setting. Whether you're planning an 
                    intimate gathering or a grand celebration, we're here to make your vision come to life.
                  </p>
                </div>

                {/* Services Overview */}
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-6 text-gray-900">
                    What We Offer
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Wedding Ceremonies & Receptions</h4>
                          <p className="text-gray-600 text-sm">Beautiful outdoor and indoor spaces for your special day</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Corporate Events</h4>
                          <p className="text-gray-600 text-sm">Professional settings for meetings and business gatherings</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Private Parties</h4>
                          <p className="text-gray-600 text-sm">Intimate celebrations for birthdays, anniversaries, and more</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Social Gatherings</h4>
                          <p className="text-gray-600 text-sm">Family reunions, baby showers, and bridal showers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="bg-primary-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-900">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Located in the equestrian town of Southwest Ranches, our venue offers easy 
                    access while maintaining a peaceful, natural setting away from the hustle 
                    and bustle of city life.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary">
                      Schedule a Tour
                    </button>
                    <button className="btn-outline">
                      Contact Us
                    </button>
                  </div>
                </div>
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
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let us help you create unforgettable memories in our beautiful venue. 
              Contact us today to schedule a consultation and tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Book Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
