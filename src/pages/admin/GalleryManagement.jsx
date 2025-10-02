import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  FaImages, 
  FaUpload, 
  FaTrash, 
  FaEdit, 
  FaEye,
  FaPlus,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Lightbox from '../../components/gallery/Lightbox';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const [imagesRes, categoriesRes] = await Promise.all([
        apiService.request('/admin/gallery', { method: 'GET' }),
        apiService.request('/admin/gallery/categories', { method: 'GET' })
      ]);
      setImages(imagesRes.data.images || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (error) {
      toast.error('Failed to fetch gallery data');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: true,
    onDrop: handleFileUpload
  });

  async function handleFileUpload(files) {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await apiService.request('/admin/gallery/upload', {
        method: 'POST',
        body: formData,
        headers: {} // Let browser set Content-Type for FormData
      });
      
      setImages(prev => [...prev, ...response.data.images]);
      toast.success(`${files.length} image(s) uploaded successfully`);
      setShowUploadModal(false);
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await apiService.request(`/admin/gallery/${imageId}`, {
        method: 'DELETE'
      });
      setImages(prev => prev.filter(img => img._id !== imageId));
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleUpdateImage = async (imageData) => {
    try {
      const response = await apiService.request(`/admin/gallery/${selectedImage._id}`, {
        method: 'PUT',
        body: JSON.stringify(imageData)
      });
      
      setImages(prev => 
        prev.map(img => 
          img._id === selectedImage._id ? response.data.image : img
        )
      );
      toast.success('Image updated successfully');
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update image');
    }
  };

  const filteredImages = images.filter(image => {
    const matchesCategory = categoryFilter === 'all' || image.category === categoryFilter;
    const matchesSearch = image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading gallery..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage your venue's photo gallery</p>
        </div>
        <Button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Upload Images
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Images', value: images.length, color: 'bg-blue-500' },
          { label: 'Categories', value: categories.length, color: 'bg-green-500' },
          { label: 'This Month', value: images.filter(img => 
            new Date(img.createdAt) > new Date(Date.now() - 30*24*60*60*1000)
          ).length, color: 'bg-purple-500' },
          { label: 'Featured', value: images.filter(img => img.featured).length, color: 'bg-yellow-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <img
                    src={image.thumbnail || image.url}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      >
                        <FaEye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(image);
                          setShowEditModal(true);
                        }}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteImage(image._id)}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      >
                        <FaTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {image.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">
                    {image.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {image.description || 'No description'}
                  </p>
                  {image.category && (
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {categories.find(c => c.slug === image.category)?.name || image.category}
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FaImages className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search criteria'
                : 'Upload your first images to get started'
              }
            </p>
            <Button onClick={() => setShowUploadModal(true)}>
              Upload Images
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Images"
        size="lg"
      >
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-amber-500 bg-amber-50' 
                : 'border-gray-300 hover:border-amber-400'
            }`}
          >
            <input {...getInputProps()} />
            <FaUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
            </p>
            <p className="text-gray-500">
              or click to browse files (JPEG, PNG, WebP)
            </p>
          </div>
          
          {uploading && (
            <div className="text-center">
              <LoadingSpinner text="Uploading images..." />
            </div>
          )}
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Image"
        size="lg"
      >
        {selectedImage && (
          <EditImageForm
            image={selectedImage}
            categories={categories}
            onSave={handleUpdateImage}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </Modal>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={(index) => setLightboxIndex(index)}
        onPrev={(index) => setLightboxIndex(index)}
      />
    </div>
  );
};

const EditImageForm = ({ image, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: image.title || '',
    description: image.description || '',
    category: image.category || '',
    featured: image.featured || false,
    alt: image.alt || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <img
            src={image.thumbnail || image.url}
            alt={image.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Image title"
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Image description"
          />
        </div>
        
        <Input
          label="Alt Text"
          value={formData.alt}
          onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
          placeholder="Alternative text for accessibility"
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured Image
          </label>
        </div>
      </div>
      
      <div className="flex gap-3 pt-4 border-t">
        <Button type="submit">Save Changes</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default GalleryManagement;
