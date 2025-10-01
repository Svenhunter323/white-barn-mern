import express from 'express';

const router = express.Router();

// @desc    Get gallery images
// @route   GET /api/gallery
// @access  Public
router.get('/', (req, res) => {
  // For now, return static gallery data
  // In production, this would come from a database
  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery/gallery1.jpg',
      category: 'weddings',
      title: 'Beautiful Wedding Ceremony',
      alt: 'Wedding ceremony at The White Barn FL'
    },
    {
      id: 2,
      src: '/images/gallery/gallery2.jpg',
      category: 'ceremonies',
      title: 'Outdoor Ceremony Setup',
      alt: 'Outdoor ceremony setup'
    },
    {
      id: 3,
      src: '/images/gallery/gallery3.jpg',
      category: 'receptions',
      title: 'Reception Hall',
      alt: 'Reception hall setup'
    },
    {
      id: 4,
      src: '/images/gallery/gallery4.jpg',
      category: 'venue',
      title: 'Venue Overview',
      alt: 'Overview of the venue'
    },
    {
      id: 5,
      src: '/images/gallery/gallery5.jpg',
      category: 'gardens',
      title: 'Garden Pathway',
      alt: 'Beautiful garden pathway'
    },
    {
      id: 6,
      src: '/images/gallery/gallery6.jpg',
      category: 'weddings',
      title: 'Wedding Photography',
      alt: 'Wedding photography session'
    }
  ];

  const category = req.query.category;
  let filteredImages = galleryImages;

  if (category && category !== 'all') {
    filteredImages = galleryImages.filter(img => img.category === category);
  }

  res.status(200).json({
    status: 'success',
    data: {
      images: filteredImages,
      total: filteredImages.length
    }
  });
});

export default router;
