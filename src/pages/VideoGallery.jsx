import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sample video data - replace with actual video URLs
  const videos = [
    {
      id: 1,
      title: 'Wedding Ceremony Highlight',
      thumbnail: '/images/gallery/gallery1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'A beautiful outdoor wedding ceremony at The White Barn FL'
    },
    {
      id: 2,
      title: 'Venue Tour',
      thumbnail: '/images/gallery/gallery2.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Take a virtual tour of our stunning venue and gardens'
    },
    {
      id: 3,
      title: 'Reception Celebration',
      thumbnail: '/images/gallery/gallery3.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Guests celebrating at a beautiful reception'
    },
    {
      id: 4,
      title: 'Garden Views',
      thumbnail: '/images/gallery/gallery4.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Explore our beautiful botanical gardens'
    },
    {
      id: 5,
      title: 'Event Setup',
      thumbnail: '/images/gallery/gallery5.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Behind the scenes of event preparation'
    },
    {
      id: 6,
      title: 'Testimonial',
      thumbnail: '/images/gallery/gallery6.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'Happy couples share their experience'
    }
  ];

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
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
            Video Gallery
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-primary-200 transition-colors">Home</a>
            <span>/</span>
            <span>Videos</span>
          </motion.nav>
        </div>
      </section>

      {/* Video Gallery Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Experience Our Venue</h2>
            <p className="text-body max-w-3xl mx-auto">
              Watch these videos to get a feel for the atmosphere and beauty of The White Barn FL. 
              See real weddings, venue tours, and testimonials from couples who chose us for their special day.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => openVideo(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-primary-500 text-xl ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <FaTimes />
            </button>

            {/* Video Iframe */}
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {selectedVideo.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Featured Video Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Featured: Venue Walkthrough</h2>
            <p className="text-body max-w-2xl mx-auto">
              Take a comprehensive tour of our venue with this detailed walkthrough video.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual featured video
                title="Venue Walkthrough"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">What Our Couples Say</h2>
            <p className="text-body max-w-2xl mx-auto">
              Hear directly from couples who celebrated their special day at The White Barn FL.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPlay className="text-primary-500 text-xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  Sarah & Michael
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  "The White Barn FL made our wedding day absolutely perfect. The venue is stunning and the staff went above and beyond."
                </p>
                <button className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                  Watch Testimonial
                </button>
              </motion.div>
            ))}
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
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a visit to experience our venue in person and discuss how we can make your event unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Book a Tour
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all">
                Get Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VideoGallery;
