import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fetch dynamic gallery data from backend
  const { data: galleryData, loading: galleryLoading } = useApi(() => ApiService.getGalleryImages(), []);
  const { data: categoriesData, loading: categoriesLoading } = useApi(() => ApiService.getGalleryCategories(), []);

  // Fallback categories if API fails
  const fallbackCategories = [
    { id: 'all', name: 'All Photos' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'ceremonies', name: 'Ceremonies' },
    { id: 'receptions', name: 'Receptions' },
    { id: 'venue', name: 'Venue' },
    { id: 'gardens', name: 'Gardens' }
  ];

  // Fallback gallery images if API fails
  const fallbackGalleryImages = [
    { id: 1, src: '/images/gallery/gallery1.jpg', category: 'weddings', title: 'Beautiful Wedding Ceremony' },
    { id: 2, src: '/images/gallery/gallery2.jpg', category: 'ceremonies', title: 'Outdoor Ceremony Setup' },
    { id: 3, src: '/images/gallery/gallery3.jpg', category: 'receptions', title: 'Reception Hall' },
    { id: 4, src: '/images/gallery/gallery4.jpg', category: 'venue', title: 'Venue Overview' },
    { id: 5, src: '/images/gallery/gallery5.jpg', category: 'gardens', title: 'Garden Pathway' },
    { id: 6, src: '/images/gallery/gallery6.jpg', category: 'weddings', title: 'Wedding Photography' },
    { id: 7, src: '/images/gallery/gallery7.jpg', category: 'ceremonies', title: 'Ceremony Arch' },
    { id: 8, src: '/images/gallery/gallery8.jpg', category: 'receptions', title: 'Reception Dining' },
    { id: 9, src: '/images/gallery/gallery9.jpg', category: 'venue', title: 'Venue Interior' },
    { id: 10, src: '/images/gallery/gallery10.jpg', category: 'gardens', title: 'Botanical Gardens' },
    { id: 11, src: '/images/banner/banner1.jpg', category: 'venue', title: 'Venue Exterior' },
    { id: 12, src: '/images/banner/banner2.jpg', category: 'weddings', title: 'Wedding Celebration' },
    { id: 13, src: '/images/banner/banner3.jpg', category: 'ceremonies', title: 'Ceremony Moment' },
    { id: 14, src: '/images/banner/banner4.jpg', category: 'receptions', title: 'Reception Party' },
    { id: 15, src: '/images/banner/banner5.jpg', category: 'gardens', title: 'Garden Views' },
    { id: 16, src: '/images/banner/banner6.jpg', category: 'venue', title: 'Venue Ambiance' }
  ];

  // Process categories data
  let categories = fallbackCategories;
  if (categoriesData && Array.isArray(categoriesData.data)) {
    categories = [
      { id: 'all', name: 'All Photos' },
      ...categoriesData.data.map(cat => ({
        id: cat,
        name: typeof cat === 'string' 
          ? cat.charAt(0).toUpperCase() + cat.slice(1) 
          : 'Category'
      }))
    ];
  }

  // Process gallery images
  let galleryImages = fallbackGalleryImages;
  if (galleryData) {
    try {
      // Handle both direct array and { data: [...] } formats
      const imagesArray = Array.isArray(galleryData) 
        ? galleryData 
        : (galleryData.data || []);
      
      galleryImages = imagesArray.map((img, index) => ({
        id: img.id || index,
        src: img.imageUrl || img.src || `fallback-image-${index}`,
        category: img.category || 'uncategorized',
        title: img.title || 'Gallery Image',
        alt: img.alt || ''
      }));
    } catch (error) {
      console.error('Error processing gallery images:', error);
    }
  }

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

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
            Gallery
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>Gallery</span>
          </motion.nav>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Beautiful Memories</h2>
            <p className="text-body max-w-3xl mx-auto">
              Explore our stunning venue through these beautiful photographs showcasing 
              weddings, ceremonies, and events held at The White Barn FL. Each image 
              tells a story of love, celebration, and unforgettable moments.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <p className="font-medium">{image.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <FaTimes />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <FaChevronRight />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300 capitalize">
                  {selectedImage.category.replace('-', ' ')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Ready to Create Your Own Beautiful Memories?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a tour of our venue and see how we can make your special day unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Schedule a Tour
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

export default Gallery;
