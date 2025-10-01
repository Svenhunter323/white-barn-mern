import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';

const Home = () => {
  // Fetch dynamic content from backend
  const { data: homeDetails, loading: homeLoading } = useApi(() => ApiService.getHomeDetails(), []);
  const { data: apiGalleryImages, loading: galleryLoading } = useApi(() => ApiService.getGalleryImages(), []);
  const { data: contactDetails, loading: contactLoading } = useApi(() => ApiService.getContactDetails(), []);

  // Fallback banner images if API fails
  const fallbackBannerImages = [
    '/images/banner/banner1.jpg',
    '/images/banner/banner2.jpg',
    '/images/banner/banner3.jpg',
    '/images/banner/banner4.jpg',
    '/images/banner/banner5.jpg',
    '/images/banner/banner6.jpg'
  ];

  // Use API data or fallback
  const bannerImages = Array.isArray(apiGalleryImages) 
    ? apiGalleryImages.slice(0, 6).map(img => img.src || img.imageUrl) 
    : fallbackBannerImages;

  const services = [
    {
      title: 'Wedding Receptions',
      description: 'Celebrate your love in an elegant setting, with our spacious venue perfect for a beautiful reception.',
      image: '/images/service4-1.jpg'
    },
    {
      title: 'Corporate Events',
      description: 'Host your next business gathering in style, whether it\'s a meeting, seminar, or team-building event.'
    },
    {
      title: 'Private Parties',
      description: 'From birthday parties to anniversaries, our venue provides the ideal backdrop for intimate gatherings.'
    },
    {
      title: 'Social Gatherings',
      description: 'Whether it\'s a family reunion, baby shower, or bridal shower, we offer a warm and welcoming space.',
      image: '/images/service4-2.jpg'
    }
  ];

  // Fallback gallery images for preview section
  const fallbackGalleryImages = [
    '/images/gallery/gallery1.jpg',
    '/images/gallery/gallery2.jpg',
    '/images/gallery/gallery3.jpg',
    '/images/gallery/gallery4.jpg',
    '/images/gallery/gallery5.jpg',
    '/images/gallery/gallery6.jpg'
  ];

  // Use API data or fallback for gallery preview
  const galleryPreviewImages = apiGalleryImages?.data?.images?.slice(6, 12).map(img => img.imageUrl) || fallbackGalleryImages;

  const marqueeItems = ['Wedding', 'Party', 'Decoration', 'Catering'];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary-300 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary-300 rounded-full animate-bounce-slow delay-1000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-primary mb-6"
            >
              {homeDetails?.data?.heroTitle || "Welcome to The White Barn FL"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-body text-xl mb-8"
            >
              {homeDetails?.data?.heroDescription || "No matter your dreams, we are here to help you create the perfect event at our venue."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="btn-primary text-lg px-8 py-4">
                Book an Appointment
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Slider Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }}
              className="gallery-swiper"
            >
              {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <FaChevronLeft className="text-primary-500" />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <FaChevronRight className="text-primary-500" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
                {homeDetails?.data?.aboutSection?.subtitle || "WELCOME TO THE WHITE BARN FL"}
              </span>
              <h2 className="heading-secondary mt-4 mb-6">
                {homeDetails?.data?.aboutSection?.title || "Host Your Beautiful Event with Us"}
              </h2>
              <p className="text-body mb-8">
                {homeDetails?.data?.aboutSection?.description || "A family-owned business with 4.95 acres of botanical paradise immersed with colorful gardens with lush beautiful flowers and trees, in the heart of the equestrian town of sw ranches. This upscale and unique nursery specializes in an assortment of colorful bougainvilleas, and in addition, includes the indoor plant showroom for an assortment of bromeliads."}
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="text-xl font-semibold mb-3 text-gray-900">Venue:</h4>
                <p className="text-gray-600">
                  Venue involves the coordination of every detail of events such as meetings, conventions, 
                  trade shows, ceremony, retreats, or parties.
                </p>
              </div>

              <button className="btn-primary">
                Book an Appointment
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/frontimg.jpg"
                  alt="Venue"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/images/frontimg2.jpg"
                  alt="Venue"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
              {homeDetails?.data?.servicesSection?.subtitle || "WEDDING SERVICES FOR YOU"}
            </span>
            <h2 className="heading-secondary mt-4 mb-6">
              {homeDetails?.data?.servicesSection?.title || "Create Unforgettable Moments at Our Venue"}
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              {homeDetails?.data?.servicesSection?.description || "Your Perfect Day, Our Beautiful Space"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`${service.image ? 'lg:col-span-1' : ''}`}
              >
                {service.image ? (
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg h-full flex flex-col justify-center">
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">
                      {service.title}
                    </h4>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-primary-500 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center space-x-8 mx-8">
              {marqueeItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-8">
                  <span className="text-white text-2xl font-bold">{item}</span>
                  <div className="w-6 h-6 border border-white/30 rounded-full"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium uppercase tracking-wider text-sm">
              Some Beautiful Memories
            </span>
            <h2 className="text-4xl font-serif font-bold mt-4">
              Beautiful Wedding Clicks
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryPreviewImages.map((image, index) => (
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
      </section>
    </div>
  );
};

export default Home;
