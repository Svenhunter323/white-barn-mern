import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import tokenManager from '../utils/tokenManager';

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

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Memoize the logout function
  const logout = useCallback(async () => {
    try {
      // Only try to call logout endpoint if we have a token
      const token = tokenManager.getToken();
      if (token) {
        await apiService.request('/auth/logout', { method: 'POST' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if server call fails
    } finally {
      // Clear token using token manager
      tokenManager.clearToken();
      // Clear auth token
      apiService.setAuthToken(null);
      
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    }
  }, []);

  // Memoize the verifyToken function
  const verifyToken = useCallback(async () => {
    // Prevent multiple simultaneous verification calls globally
    if (tokenManager.isVerifying()) {
      console.log('Token verification already in progress globally, skipping...');
      return;
    }

    tokenManager.setVerifying(true);
    
    try {
      const token = tokenManager.getToken();
      console.log('Verifying token:', token ? 'Token found' : 'No token');
      
      if (!tokenManager.hasValidToken()) {
        // No valid token found, user is not logged in
        console.log('No valid token, setting logout state');
        dispatch({ type: 'LOGOUT' });
        return;
      }

      // Set token before making request
      apiService.setAuthToken(token);
      console.log('Making verify-token request...');
      
      const response = await apiService.request('/auth/verify-token', { method: 'GET' });
      console.log('Token verification successful');
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          admin: response.data?.admin,
          token: token
        }
      });
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Clear invalid token and logout
      tokenManager.clearToken();
      apiService.setAuthToken(null);
      dispatch({ type: 'LOGOUT' });
    } finally {
      tokenManager.setVerifying(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      console.log('Attempting login...');
      
      const response = await apiService.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      
      console.log('Login response received:', response);
      const token = response.token;
      const admin = response.data?.admin;

      if (!token) {
        console.error('Full response:', response);
        throw new Error('No token received from server');
      }

      if (!admin) {
        console.error('Full response:', response);
        throw new Error('No admin data received from server');
      }

      console.log('Storing token and setting auth...');
      
      // Set token using token manager (this will also set the cookie)
      apiService.setAuthToken(token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { admin, token }
      });

      console.log('Login successful for:', admin.email);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.message);
      const errorMessage = error.message || 'Login failed';
      
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (passwordData) => {
    try {
      await apiService.request('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify(passwordData)
      });
      
      // Update admin to remove requirePasswordChange flag
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { requirePasswordChange: false }
      });

      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Password change failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await apiService.request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });
      
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: response.data.admin
      });

      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Forgot password function
  const forgotPassword = useCallback(async (email) => {
    try {
      await apiService.request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      toast.success('Password reset email sent!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to send reset email';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(async (token, password) => {
    try {
      await apiService.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password })
      });
      toast.success('Password reset successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Initialize auth state from stored token on mount
  useEffect(() => {
    console.log('AuthProvider mounted - checking stored token');
    const token = tokenManager.getToken();
    
    if (tokenManager.hasValidToken()) {
      console.log('Valid token found, setting authenticated state');
      // Set token in API service
      apiService.setAuthToken(token);
      
      // Set authenticated state without server verification
      // The server will verify on first API call
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          admin: null, // Will be populated on first API call
          token: token
        }
      });
    } else {
      console.log('No valid token found, setting logout state');
      dispatch({ type: 'LOGOUT' });
    }
  }, []); // Only run once on mount

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    ...state,
    login,
    logout,
    verifyToken,
    changePassword,
    updateProfile,
    forgotPassword,
    resetPassword,
    clearError
  }), [
    state,
    login,
    logout,
    verifyToken,
    changePassword,
    updateProfile,
    forgotPassword,
    resetPassword,
    clearError
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
