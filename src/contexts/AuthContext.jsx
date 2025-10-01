import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        admin: action.payload.admin,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        error: null,
        loading: false
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        admin: { ...state.admin, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
  loading: false,
  error: null
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Configure axios defaults
  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token on app load
      verifyToken();
    }
  }, []);

  // Verify token validity
  const verifyToken = async () => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await axios.get('/api/auth/me');
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          admin: response.data.data.admin,
          token: Cookies.get('admin_token')
        }
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await axios.post('/api/auth/login', credentials);
      const { token, admin } = response.data.data;

      // Store token in cookie
      Cookies.set('admin_token', token, { 
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { admin, token }
      });

      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token from cookie
      Cookies.remove('admin_token');
      
      // Remove axios default header
      delete axios.defaults.headers.common['Authorization'];
      
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    try {
      const response = await axios.put('/api/auth/change-password', passwordData);
      
      // Update admin to remove requirePasswordChange flag
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { requirePasswordChange: false }
      });

      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', profileData);
      
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: response.data.data.admin
      });

      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      await axios.post('/api/auth/forgot-password', { email });
      toast.success('Password reset email sent!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Reset password function
  const resetPassword = async (token, password) => {
    try {
      const response = await axios.put(`/api/auth/reset-password/${token}`, { password });
      
      // Auto-login after password reset
      const { token: newToken, admin } = response.data.data;
      
      Cookies.set('admin_token', newToken, { 
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { admin, token: newToken }
      });

      toast.success('Password reset successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    logout,
    changePassword,
    updateProfile,
    forgotPassword,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
