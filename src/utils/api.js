import axios from 'axios';
import toast from 'react-hot-toast';

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add loading state if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/admin/login';
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// Admin API functions
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => axios.get('/admin/dashboard/stats'),

  // Admin management
  getAllAdmins: (params) => axios.get('/admin/admins', { params }),
  updateAdminStatus: (id, data) => axios.put(`/admin/admins/${id}/status`, data),
  deleteAdmin: (id) => axios.delete(`/admin/admins/${id}`),

  // Contact management
  getContacts: (params) => axios.get('/admin/contacts', { params }),
  getContact: (id) => axios.get(`/admin/contacts/${id}`),
  updateContactStatus: (id, data) => axios.put(`/admin/contacts/${id}`, data),
  deleteContact: (id) => axios.delete(`/admin/contacts/${id}`),

  // Content management
  updateContactDetails: (data) => axios.put('/admin/content/contact-details', data),
  updateAboutDetails: (data) => axios.put('/admin/content/about-details', data),
  updateHomeDetails: (data) => axios.put('/admin/content/home-details', data),
  updatePropertyDetails: (data) => axios.put('/admin/content/property-details', data),
  updateSocialLinks: (data) => axios.put('/admin/content/social-links', data),

  // Review management
  getReviews: (params) => axios.get('/admin/reviews', { params }),
  updateReviewStatus: (id, data) => axios.put(`/admin/reviews/${id}`, data),
  deleteReview: (id) => axios.delete(`/admin/reviews/${id}`),

  // Gallery management
  getGalleryImages: (params) => axios.get('/admin/gallery', { params }),
  updateGalleryImage: (id, data) => axios.put(`/admin/gallery/${id}`, data),
  deleteGalleryImage: (id) => axios.delete(`/admin/gallery/${id}`),
  updateGalleryOrder: (data) => axios.put('/admin/gallery/order', data),

  // File upload
  uploadGalleryImages: (formData, onProgress) => {
    return axios.post('/upload/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress
    });
  },
  uploadAvatar: (formData) => {
    return axios.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }
};

// Public API functions
export const publicAPI = {
  // Content
  getContactDetails: () => axios.get('/content/contact-details'),
  getAboutDetails: () => axios.get('/content/about-details'),
  getHomeDetails: () => axios.get('/content/home-details'),
  getSocialLinks: () => axios.get('/content/social-links'),
  getPropertyDetails: () => axios.get('/content/property-details'),
  getReviews: (params) => axios.get('/content/reviews', { params }),

  // Gallery
  getGalleryImages: (params) => axios.get('/gallery', { params }),

  // Contact form
  submitContactForm: (data) => axios.post('/contact', data)
};

// Utility functions
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  const message = error.response?.data?.message || defaultMessage;
  toast.error(message);
  return message;
};

export const handleApiSuccess = (response, defaultMessage = 'Operation successful') => {
  const message = response.data?.message || defaultMessage;
  toast.success(message);
  return message;
};

// File upload utilities
export const uploadFile = async (file, endpoint, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleFiles = async (files, endpoint, onProgress) => {
  const formData = new FormData();
  
  files.forEach((file, index) => {
    formData.append('images', file);
  });

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axios;
