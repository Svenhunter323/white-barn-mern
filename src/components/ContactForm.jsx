import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApiService from '../services/api';
import { useApiMutation } from '../hooks/useApi';

const ContactForm = ({ isFooter = true }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate, loading: isSubmitting } = useApiMutation();

  const onSubmit = async (data) => {
    try {
      await mutate(() => ApiService.submitContactForm(data));
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
    isFooter ? 'bg-white/10 border-gray-600 text-white placeholder-gray-300' : 'bg-white'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    isFooter ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>
            Full Name *
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={inputClasses}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>
            Email Address *
          </label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            className={inputClasses}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      {!isFooter && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={inputClasses}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className={labelClasses}>
              Address
            </label>
            <input
              type="text"
              {...register('address')}
              className={inputClasses}
              placeholder="Enter your address"
            />
          </div>
        </div>
      )}

      <div>
        <label className={labelClasses}>
          Message *
        </label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={5}
          className={inputClasses}
          placeholder="Tell us about your event..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
          isFooter 
            ? 'bg-primary-500 hover:bg-primary-600 text-white' 
            : 'btn-primary'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Sending...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
