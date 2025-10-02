import tokenManager from '../utils/tokenManager';

// API base URL with /api prefix
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.authToken = null;
  }

  setAuthToken(token) {
    this.authToken = token;
    tokenManager.setToken(token);
  }

  getStoredToken() {
    return tokenManager.getToken();
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Get token from storage if not set in instance
    if (!this.authToken) {
      const storedToken = this.getStoredToken();
      if (storedToken) {
        this.authToken = storedToken;
      }
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
      credentials: 'include', // Include cookies for cross-origin requests
    };

    console.log('API Request:', {
      url,
      method: options.method || 'GET',
      hasToken: !!this.authToken,
      tokenPreview: this.authToken ? `${this.authToken.substring(0, 20)}...` : 'None'
    });

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If we can't parse the error response, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
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
