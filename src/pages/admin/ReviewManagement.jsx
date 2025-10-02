import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaTrash,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaUser
} from 'react-icons/fa';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/admin/reviews', {
        method: 'GET'
      });
      setReviews(response.data.reviews || []);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await apiService.request(`/admin/reviews/${reviewId}/approve`, {
        method: 'PATCH'
      });
      setReviews(prev => 
        prev.map(review => 
          review._id === reviewId 
            ? { ...review, status: 'approved' }
            : review
        )
      );
      toast.success('Review approved successfully');
    } catch (error) {
      toast.error('Failed to approve review');
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await apiService.request(`/admin/reviews/${reviewId}/reject`, {
        method: 'PATCH'
      });
      setReviews(prev => 
        prev.map(review => 
          review._id === reviewId 
            ? { ...review, status: 'rejected' }
            : review
        )
      );
      toast.success('Review rejected');
    } catch (error) {
      toast.error('Failed to reject review');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await apiService.request(`/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      setReviews(prev => prev.filter(review => review._id !== reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.review.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading reviews..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600">Manage customer reviews and testimonials</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Reviews', 
            value: reviews.length, 
            color: 'bg-blue-500' 
          },
          { 
            label: 'Pending', 
            value: reviews.filter(r => r.status === 'pending').length, 
            color: 'bg-yellow-500' 
          },
          { 
            label: 'Approved', 
            value: reviews.filter(r => r.status === 'approved').length, 
            color: 'bg-green-500' 
          },
          { 
            label: 'Average Rating', 
            value: reviews.length > 0 
              ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
              : '0.0', 
            color: 'bg-purple-500' 
          }
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
            <div className="flex-1 relative">
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {review.clientName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="w-4 h-4" />
                          <span>{review.clientEmail}</span>
                        </div>
                        {review.eventType && (
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{review.eventType}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 line-clamp-3 mb-4">
                        {review.review}
                      </p>
                      
                      {review.eventDate && (
                        <p className="text-sm text-gray-500">
                          Event Date: {format(new Date(review.eventDate), 'MMMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowDetailsModal(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <FaEye className="w-4 h-4" />
                        View
                      </Button>
                      
                      {review.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(review._id)}
                            className="flex items-center gap-2 text-green-600 hover:text-green-700"
                          >
                            <FaCheck className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(review._id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <FaTimes className="w-4 h-4" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <FaTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredReviews.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FaStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || ratingFilter !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'No reviews submitted yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Review Details"
        size="lg"
      >
        {selectedReview && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <p className="text-gray-900">{selectedReview.clientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedReview.clientEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-gray-600">({selectedReview.rating}/5)</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReview.status)}`}>
                  {selectedReview.status}
                </span>
              </div>
              {selectedReview.eventType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <p className="text-gray-900 capitalize">{selectedReview.eventType}</p>
                </div>
              )}
              {selectedReview.eventDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <p className="text-gray-900">{format(new Date(selectedReview.eventDate), 'MMMM dd, yyyy')}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                <p className="text-gray-900">{format(new Date(selectedReview.createdAt), 'MMMM dd, yyyy HH:mm')}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedReview.review}</p>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t">
              {selectedReview.status === 'pending' && (
                <>
                  <Button 
                    onClick={() => {
                      handleApprove(selectedReview._id);
                      setShowDetailsModal(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <FaCheck className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleReject(selectedReview._id);
                      setShowDetailsModal(false);
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <FaTimes className="w-4 h-4" />
                    Reject
                  </Button>
                </>
              )}
              <Button 
                variant="outline" 
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewManagement;
