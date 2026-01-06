import React, { useState, useEffect } from 'react';
import { Mail, Flame, Rocket } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './ContactForm.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface ServiceCategory {
  id: number;
  category_name: string;
  slug: string;
}

const ContactForm: React.FC = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public-api/service-categories.php`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setServiceCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/public-api/contact-form.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: ''
          });
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to submit the form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.infoHeader}>
              <span className={styles.sectionLabel}>
                {settings?.get_in_touch_title || 'Get In Touch'}
              </span>
              <h2 className={styles.sectionTitle}>
                Let's Discuss Your
                <span className={styles.accentText}> Fire Safety Needs</span>
              </h2>
              <p className={styles.sectionDescription}>
                {settings?.get_in_touch_subtitle || 'Ready to enhance your fire safety? Our experts are here to help you create a comprehensive safety solution tailored to your specific requirements.'}
              </p>
            </div>
            
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.contactContent}>
                  <h4>{settings?.general_enquiry_person || 'General Contact'}</h4>
                  <p>{settings?.general_enquiry_email || 'info@xeluxefiresafety.com'}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.contactContent}>
                  <h4>{settings?.managing_partner_person || 'Your Direct Contact'}</h4>
                  <p>{settings?.managing_partner_email || 'c.ahking@xeluxefiresafety.com'}</p>
                </div>
              </div>
            </div>

            
          </div>
          
          <div className={styles.formSection}>
            {submitStatus === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your inquiry! We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>
                    <Flame className={styles.formIcon} size={24} />
                    Request a Quote
                  </h3>
                  <p className={styles.formDescription}>
                    Fill out the form below and we'll get back to you with a customized solution.
                  </p>
                </div>
              
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="company" className={styles.label}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="service" className={styles.label}>
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={styles.select}
                    required
                    disabled={servicesLoading}
                  >
                    <option value="">{servicesLoading ? 'Loading services...' : 'Select a service'}</option>
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.category_name}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={4}
                    required
                    placeholder="Tell us about your fire safety requirements..."
                  />
                </div>
              </div>
              
              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}

              <div className={styles.buttonContainer}>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Rocket className={styles.buttonIcon} size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
