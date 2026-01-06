import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesApi } from '../services/api';
import type { ServiceCategory } from '../services/api';
import styles from './Services.module.css';

const Services: React.FC = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getServiceCategories();
        if (response.success && response.data) {
          // Display all categories as tabs on the Services page
          setServiceCategories(response.data);
          if (response.data.length > 0) {
            setActiveTab(response.data[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const tabVariants = {
    active: {
      backgroundColor: '#F5F5F5',
      color: '#1A1A1A',
      fontWeight: 600,
      transition: { duration: 0.3 }
    },
    inactive: {
      backgroundColor: 'transparent',
      color: '#666666',
      fontWeight: 400,
      transition: { duration: 0.3 }
    }
  } as const;

  const contentVariants = {
    hidden: { 
      opacity: 0,
      x: 20
    },
    visible: { 
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -20
    }
  } as const;

  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);

  if (loading) {
    return (
      <div className={styles.servicesPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading services...</p>
          <div className={styles.skeletonLayout}>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonSubtitle}></div>
            </div>
            <div className={styles.skeletonServicesContainer}>
              <div className={styles.skeletonTabs}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={styles.skeletonTab}></div>
                ))}
              </div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonContentTitle}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText} style={{ width: '95%' }}></div>
                <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                <div className={styles.skeletonListTitle}></div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.skeletonListItem}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.servicesPage}>
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageTitle}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We provide comprehensive engineering solutions across multiple disciplines
            </motion.p>
          </div>

          {serviceCategories.length > 0 && (
            <div className={styles.servicesContainer}>
              {/* Vertical Tab Menu - Category Names */}
              <div className={styles.tabsContainer}>
                {serviceCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    className={`${styles.tab} ${activeTab === category.id ? styles.tabActive : ''}`}
                    variants={tabVariants}
                    animate={activeTab === category.id ? 'active' : 'inactive'}
                    onClick={() => setActiveTab(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.category_name}
                  </motion.button>
                ))}
              </div>

              {/* Content Area - Service List */}
              <div className={styles.contentContainer}>
                <AnimatePresence mode="wait">
                  {activeCategory && (
                    <motion.div
                      key={activeCategory.id}
                      className={styles.serviceContent}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2>{activeCategory.category_name}</h2>
                      
                      {activeCategory.short_description && (
                        <div 
                          className={styles.categoryDescription}
                          dangerouslySetInnerHTML={{ __html: activeCategory.short_description }}
                        />
                      )}

                      <div className={styles.servicesList}>
                        <h3 className={styles.servicesListTitle}>Available Services:</h3>
                        <ul className={styles.serviceItems}>
                          {activeCategory.services.map((service) => (
                            <motion.li 
                              key={service.id}
                              className={styles.serviceItem}
                              whileHover={{ x: 8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <a
                                href={`/service/${service.slug}`}
                                className={styles.serviceLink}
                              >
                                {service.title}
                                <span className={styles.arrow}>→</span>
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;