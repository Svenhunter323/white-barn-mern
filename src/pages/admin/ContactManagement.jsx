import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaEye, 
  FaTrash, 
  FaReply, 
  FaSearch,
  FaFilter,
  FaDownload,
  FaClock,
  FaUser,
  FaPhone,
  FaCalendarAlt
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

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/admin/contacts', {
        method: 'GET'
      });
      setContacts(response.data.contacts || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetailsModal(true);
    markAsRead(contact._id);
  };

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyMessage(`Dear ${contact.name},\n\nThank you for contacting The White Barn FL. `);
    setShowReplyModal(true);
  };

  const markAsRead = async (contactId) => {
    try {
      await apiService.request(`/admin/contacts/${contactId}/read`, {
        method: 'PATCH'
      });
      setContacts(prev => 
        prev.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: 'read' }
            : contact
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      await apiService.request(`/admin/contacts/${contactId}`, {
        method: 'DELETE'
      });
      setContacts(prev => prev.filter(contact => contact._id !== contactId));
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
      console.error('Error deleting contact:', error);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setReplying(true);
    try {
      await apiService.request(`/admin/contacts/${selectedContact._id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ message: replyMessage })
      });
      
      toast.success('Reply sent successfully');
      setShowReplyModal(false);
      setReplyMessage('');
      
      // Mark as replied
      setContacts(prev => 
        prev.map(contact => 
          contact._id === selectedContact._id 
            ? { ...contact, status: 'replied' }
            : contact
        )
      );
    } catch (error) {
      toast.error('Failed to send reply');
      console.error('Error sending reply:', error);
    } finally {
      setReplying(false);
    }
  };

  const exportContacts = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Subject', 'Event Type', 'Event Date', 'Status', 'Created At'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.subject || '',
        contact.eventType || '',
        contact.eventDate || '',
        contact.status || 'unread',
        format(new Date(contact.createdAt), 'yyyy-MM-dd HH:mm:ss')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.subject && contact.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const contactDate = new Date(contact.createdAt);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          return contactDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return contactDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return contactDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (eventType) => {
    switch (eventType) {
      case 'wedding': return 'border-l-pink-500';
      case 'corporate': return 'border-l-blue-500';
      case 'birthday': return 'border-l-yellow-500';
      default: return 'border-l-gray-300';
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading contacts..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportContacts} variant="outline" className="flex items-center gap-2">
            <FaDownload className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: contacts.length, color: 'bg-blue-500' },
          { label: 'Unread', value: contacts.filter(c => c.status === 'unread').length, color: 'bg-red-500' },
          { label: 'Read', value: contacts.filter(c => c.status === 'read').length, color: 'bg-yellow-500' },
          { label: 'Replied', value: contacts.filter(c => c.status === 'replied').length, color: 'bg-green-500' }
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
            <div className="flex-1">
              <Input
                placeholder="Search contacts..."
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
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border-l-4 ${getPriorityColor(contact.eventType)} hover:shadow-md transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status || 'unread'}
                        </span>
                        {contact.eventType && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                            {contact.eventType}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <FaPhone className="w-4 h-4" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                        {contact.eventDate && (
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span>{format(new Date(contact.eventDate), 'MMM dd, yyyy')}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FaClock className="w-4 h-4" />
                          <span>{format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                      </div>
                      
                      {contact.subject && (
                        <p className="mt-2 text-sm text-gray-700 font-medium">
                          Subject: {contact.subject}
                        </p>
                      )}
                      
                      {contact.message && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {contact.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(contact)}
                        className="flex items-center gap-2"
                      >
                        <FaEye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReply(contact)}
                        className="flex items-center gap-2"
                      >
                        <FaReply className="w-4 h-4" />
                        Reply
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact._id)}
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
        
        {filteredContacts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FaEnvelope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'No contact submissions yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contact Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Contact Details"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedContact.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
              )}
              {selectedContact.eventType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <p className="text-gray-900 capitalize">{selectedContact.eventType}</p>
                </div>
              )}
              {selectedContact.eventDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <p className="text-gray-900">{format(new Date(selectedContact.eventDate), 'MMMM dd, yyyy')}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                <p className="text-gray-900">{format(new Date(selectedContact.createdAt), 'MMMM dd, yyyy HH:mm')}</p>
              </div>
            </div>
            
            {selectedContact.subject && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <p className="text-gray-900">{selectedContact.subject}</p>
              </div>
            )}
            
            {selectedContact.message && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            )}
            
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={() => handleReply(selectedContact)} className="flex items-center gap-2">
                <FaReply className="w-4 h-4" />
                Reply
              </Button>
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

      {/* Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        title={`Reply to ${selectedContact?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reply Message
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Type your reply message here..."
            />
          </div>
          
          <Alert>
            <AlertDescription>
              This reply will be sent to {selectedContact?.email}
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={handleSendReply} 
              loading={replying}
              className="flex items-center gap-2"
            >
              <FaReply className="w-4 h-4" />
              Send Reply
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReplyModal(false)}
              disabled={replying}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContactManagement;
