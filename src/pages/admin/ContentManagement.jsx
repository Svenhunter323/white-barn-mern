import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaInfoCircle, 
  FaPhone, 
  FaSave, 
  FaEdit,
  FaEye,
  FaUndo
} from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'home', label: 'Homepage', icon: FaHome },
    { id: 'about', label: 'About Us', icon: FaInfoCircle },
    { id: 'contact', label: 'Contact Info', icon: FaPhone }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/admin/content', {
        method: 'GET'
      });
      setContent(response.data.content || {});
    } catch (error) {
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiService.request('/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ content })
      });
      toast.success('Content saved successfully');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading content..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage your website content and information</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <Button
              variant="outline"
              onClick={() => {
                fetchContent();
                setHasChanges(false);
              }}
              className="flex items-center gap-2"
            >
              <FaUndo className="w-4 h-4" />
              Reset Changes
            </Button>
          )}
          <Button
            onClick={handleSave}
            loading={saving}
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <FaSave className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Forms */}
      <div className="space-y-6">
        {activeTab === 'home' && (
          <HomeContentForm
            content={content.home || {}}
            onChange={(field, value) => updateContent('home', field, value)}
          />
        )}
        
        {activeTab === 'about' && (
          <AboutContentForm
            content={content.about || {}}
            onChange={(field, value) => updateContent('about', field, value)}
          />
        )}
        
        {activeTab === 'contact' && (
          <ContactContentForm
            content={content.contact || {}}
            onChange={(field, value) => updateContent('contact', field, value)}
          />
        )}
      </div>
    </div>
  );
};

const HomeContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Main Headline"
            value={content.heroTitle || ''}
            onChange={(e) => onChange('heroTitle', e.target.value)}
            placeholder="Your Perfect Event Starts Here"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Description</label>
            <textarea
              value={content.heroDescription || ''}
              onChange={(e) => onChange('heroDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Create unforgettable memories at our beautiful venue..."
            />
          </div>
          <Input
            label="Call-to-Action Button Text"
            value={content.heroCTA || ''}
            onChange={(e) => onChange('heroCTA', e.target.value)}
            placeholder="Book Your Event"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Services Title"
            value={content.servicesTitle || ''}
            onChange={(e) => onChange('servicesTitle', e.target.value)}
            placeholder="Our Services"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Services Description</label>
            <textarea
              value={content.servicesDescription || ''}
              onChange={(e) => onChange('servicesDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="We offer a variety of services for your special events..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Features Title"
            value={content.featuresTitle || ''}
            onChange={(e) => onChange('featuresTitle', e.target.value)}
            placeholder="Why Choose Us"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="space-y-2">
                <Input
                  label={`Feature ${num} Title`}
                  value={content[`feature${num}Title`] || ''}
                  onChange={(e) => onChange(`feature${num}Title`, e.target.value)}
                  placeholder={`Feature ${num}`}
                />
                <textarea
                  value={content[`feature${num}Description`] || ''}
                  onChange={(e) => onChange(`feature${num}Description`, e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={`Description for feature ${num}...`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AboutContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Us Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Page Title"
            value={content.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="About The White Barn FL"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Main Content</label>
            <textarea
              value={content.mainContent || ''}
              onChange={(e) => onChange('mainContent', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Tell your story here..."
            />
          </div>
          <Input
            label="Mission Statement"
            value={content.mission || ''}
            onChange={(e) => onChange('mission', e.target.value)}
            placeholder="Our mission is to..."
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Vision Statement</label>
            <textarea
              value={content.vision || ''}
              onChange={(e) => onChange('vision', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Our vision is to..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Team Section Title"
            value={content.teamTitle || ''}
            onChange={(e) => onChange('teamTitle', e.target.value)}
            placeholder="Meet Our Team"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Description</label>
            <textarea
              value={content.teamDescription || ''}
              onChange={(e) => onChange('teamDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Our experienced team is dedicated to..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ContactContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              value={content.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
              placeholder="The White Barn FL"
            />
            <Input
              label="Phone Number"
              value={content.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
            <Input
              label="Email Address"
              type="email"
              value={content.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="info@thewhitebarnfl.com"
            />
            <Input
              label="Website"
              value={content.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="www.thewhitebarnfl.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <textarea
              value={content.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="123 Barn Road, City, State 12345"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map(day => (
            <div key={day} className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">{day}</label>
              <Input
                value={content[`${day.toLowerCase()}Hours`] || ''}
                onChange={(e) => onChange(`${day.toLowerCase()}Hours`, e.target.value)}
                placeholder="9:00 AM - 5:00 PM"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`${day}-closed`}
                  checked={content[`${day.toLowerCase()}Closed`] || false}
                  onChange={(e) => onChange(`${day.toLowerCase()}Closed`, e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor={`${day}-closed`} className="ml-2 text-sm text-gray-600">
                  Closed
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Facebook URL"
              value={content.facebookUrl || ''}
              onChange={(e) => onChange('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/thewhitebarnfl"
            />
            <Input
              label="Instagram URL"
              value={content.instagramUrl || ''}
              onChange={(e) => onChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/thewhitebarnfl"
            />
            <Input
              label="Twitter URL"
              value={content.twitterUrl || ''}
              onChange={(e) => onChange('twitterUrl', e.target.value)}
              placeholder="https://twitter.com/thewhitebarnfl"
            />
            <Input
              label="LinkedIn URL"
              value={content.linkedinUrl || ''}
              onChange={(e) => onChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/company/thewhitebarnfl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
