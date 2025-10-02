import Cookies from 'js-cookie';

class TokenManager {
  constructor() {
    this.token = null;
    this.listeners = new Set();
    this.verifying = false;
  }

  // Get current token
  getToken() {
    if (!this.token) {
      this.token = Cookies.get('admin_token');
    }
    return this.token;
  }

  // Set token and notify listeners
  setToken(token) {
    this.token = token;
    if (token) {
      Cookies.set('admin_token', token, { 
        expires: 7, // 7 days
        secure: import.meta.env.PROD,
        sameSite: 'strict'
      });
    } else {
      Cookies.remove('admin_token');
    }
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(token));
  }

  // Clear token
  clearToken() {
    this.setToken(null);
  }

  // Subscribe to token changes
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Check if token exists and is valid format
  hasValidToken() {
    const token = this.getToken();
    return token && token !== 'null' && token !== 'undefined' && token.length > 0;
  }

  // Verification state management
  isVerifying() {
    return this.verifying;
  }

  setVerifying(state) {
    this.verifying = state;
  }
}

// Export singleton instance
export default new TokenManager();
