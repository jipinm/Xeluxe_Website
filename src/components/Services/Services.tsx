import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';
import { servicesApi } from '../../services/api';
import type { ServiceCategory } from '../../services/api';
import styles from './Services.module.css';

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await servicesApi.getServiceCategories();
        if (response.success && response.data) {
          setServiceCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching service categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCategories();
  }, []);

  // Navigate to appropriate route based on services count (same logic as header menu)
  const handleServiceClick = (category: ServiceCategory) => {
    if (category.services.length === 1) {
      // Single service: navigate directly to /service/{service_slug}
      window.location.href = `/service/${category.services[0].slug}`;
    } else {
      // Multiple services: navigate to /services page to show all services
      window.location.href = '/services';
    }
  };

  // Parse HTML list to extract features
  const parseFeatures = (html: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems).map(li => li.textContent?.trim() || '');
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section id="services" className={styles.services} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={styles.title}>{settings?.what_we_do_title || 'What We Do'}</h2>
          <p className={styles.subtitle}>
            {settings?.what_we_do_subtitle || 'Explore our specialised engineering services — from strategy and design to delivery and beyond.'}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {!loading && serviceCategories.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={styles.serviceCard}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.03,
                rotateX: 3,
                rotateY: 3,
                transition: { duration: 0.3 }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: 1000,
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${service.category_name} details`}
              onClick={() => handleServiceClick(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleServiceClick(service);
                }
              }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <motion.div 
                    className={styles.serviceIcon}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <img 
                      src={`${API_BASE_URL}/${service.featured_image}`} 
                      alt={service.category_name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </motion.div>
                </div>
                <h3 className={styles.serviceTitle}>{service.category_name}</h3>
              </div>
              
              <ul className={styles.featuresList}>
                {parseFeatures(service.short_description).map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
