const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Content API methods
  async getHomeDetails() {
    return this.request('/content/home-details');
  }

  async getAboutDetails() {
    return this.request('/content/about-details');
  }

  async getContactDetails() {
    return this.request('/content/contact-details');
  }

  async getSocialLinks() {
    return this.request('/content/social-links');
  }

  async getPropertyDetails() {
    return this.request('/content/property-details');
  }

  // Gallery API methods
  async getGalleryImages(category = '') {
    const endpoint = category ? `/gallery?category=${category}` : '/gallery';
    return this.request(endpoint);
  }

  async getGalleryCategories() {
    return this.request('/gallery/categories');
  }

  // Contact API methods
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Reviews API methods
  async getReviews() {
    return this.request('/reviews');
  }

  async getApprovedReviews() {
    return this.request('/reviews?status=approved');
  }
}

export default new ApiService();
