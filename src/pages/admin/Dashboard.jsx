import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaImages, 
  FaStar, 
  FaUsers,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaClock
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { adminAPI } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock chart data - in real app, fetch from API
  const chartData = [
    { name: 'Jan', contacts: 12, reviews: 8 },
    { name: 'Feb', contacts: 19, reviews: 12 },
    { name: 'Mar', contacts: 15, reviews: 10 },
    { name: 'Apr', contacts: 25, reviews: 15 },
    { name: 'May', contacts: 22, reviews: 18 },
    { name: 'Jun', contacts: 30, reviews: 20 }
  ];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats?.stats?.contacts?.total || 0,
      change: '+12%',
      changeType: 'increase',
      icon: FaEnvelope,
      color: 'bg-blue-500',
      link: '/admin/contacts'
    },
    {
      title: 'Gallery Images',
      value: stats?.stats?.gallery?.active || 0,
      change: '+5%',
      changeType: 'increase',
      icon: FaImages,
      color: 'bg-green-500',
      link: '/admin/gallery'
    },
    {
      title: 'Reviews',
      value: stats?.stats?.reviews?.approved || 0,
      change: '+8%',
      changeType: 'increase',
      icon: FaStar,
      color: 'bg-yellow-500',
      link: '/admin/reviews'
    },
    {
      title: 'Active Admins',
      value: stats?.stats?.admins || 0,
      change: '0%',
      changeType: 'neutral',
      icon: FaUsers,
      color: 'bg-purple-500',
      link: '/admin/admins'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your venue.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={card.link} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                    <div className="flex items-center mt-2">
                      {card.changeType === 'increase' ? (
                        <FaArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : card.changeType === 'decrease' ? (
                        <FaArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      ) : null}
                      <span className={`text-sm font-medium ${
                        card.changeType === 'increase' ? 'text-green-600' : 
                        card.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {card.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Form Submissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="contacts" 
                stroke="#f59332" 
                strokeWidth={2}
                dot={{ fill: '#f59332' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reviews Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews Received</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reviews" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Contacts</h3>
            <Link 
              to="/admin/contacts" 
              className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.recentActivity?.contacts?.slice(0, 5).map((contact, index) => (
              <div key={contact._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {contact.email}
                  </p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500">
                  <FaClock className="inline h-3 w-3 mr-1" />
                  {format(new Date(contact.createdAt), 'MMM dd')}
                </div>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">No recent contacts</p>
            )}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
            <Link 
              to="/admin/reviews" 
              className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.recentActivity?.reviews?.slice(0, 5).map((review, index) => (
              <div key={review._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaStar className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {review.clientName}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500">
                  <FaClock className="inline h-3 w-3 mr-1" />
                  {format(new Date(review.createdAt), 'MMM dd')}
                </div>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">No recent reviews</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/gallery/upload"
            className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <FaImages className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-sm font-medium text-primary-900">Upload Images</span>
          </Link>
          <Link
            to="/admin/content/home"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FaEye className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-sm font-medium text-green-900">Edit Homepage</span>
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <FaStar className="h-5 w-5 text-yellow-600 mr-3" />
            <span className="text-sm font-medium text-yellow-900">Manage Reviews</span>
          </Link>
          <Link
            to="/admin/contacts"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaEnvelope className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-sm font-medium text-blue-900">View Messages</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
