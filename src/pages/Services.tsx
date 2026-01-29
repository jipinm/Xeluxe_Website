import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesApi } from '../services/api';
import type { ServiceCategory } from '../services/api';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './Services.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Services: React.FC = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getServiceCategories();
        if (response.success && response.data) {
          setServiceCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
            <div className={styles.skeletonCardsGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonCardHeader}>
                    <div className={styles.skeletonCardIcon}></div>
                    <div className={styles.skeletonCardNumber}></div>
                  </div>
                  <div className={styles.skeletonCardContent}>
                    <div className={styles.skeletonCardTitle}></div>
                    <div className={styles.skeletonCardText}></div>
                    <div className={styles.skeletonCardText} style={{ width: '80%' }}></div>
                    <div className={styles.skeletonCardText} style={{ width: '60%' }}></div>
                    <div className={styles.skeletonCardButton}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.servicesPage}>
      <InternalHeader pageTitle="Our Services" />
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <motion.div 
              className={styles.headerContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className={styles.headerTag}>What We Offer</span>
              <h1 className={styles.headerTitle}>Our Services</h1>
              <p className={styles.headerSubtitle}>
                We provide comprehensive engineering solutions across multiple disciplines, 
                delivering excellence from concept to completion.
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <motion.div 
            className={styles.cardsGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`${styles.serviceCard} ${expandedCard === category.id ? styles.serviceCardExpanded : ''}`}
                variants={cardVariants}
                layout
              >
                {/* Card Header with Icon */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconWrapper}>
                    <img 
                      src={`${API_BASE_URL}/${category.featured_image}`}
                      alt={category.category_name}
                      className={styles.cardIcon}
                    />
                  </div>
                  <div className={styles.cardNumber}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{category.category_name}</h3>
                  
                  {category.short_description && (
                    <div 
                      className={styles.cardDescription}
                      dangerouslySetInnerHTML={{ __html: category.short_description }}
                    />
                  )}

                  {/* Expand/Collapse Button */}
                  <button 
                    className={styles.expandButton}
                    onClick={() => toggleCard(category.id)}
                    aria-expanded={expandedCard === category.id}
                  >
                    <span>{expandedCard === category.id ? 'Hide Services' : `View ${category.services.length} Service${category.services.length > 1 ? 's' : ''}`}</span>
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                      animate={{ rotate: expandedCard === category.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>

                  {/* Expanded Services List */}
                  <AnimatePresence>
                    {expandedCard === category.id && (
                      <motion.div
                        className={styles.expandedServices}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={styles.servicesListWrapper}>
                          {category.services.map((service, serviceIndex) => (
                            <motion.a
                              key={service.id}
                              href={`/service/${service.slug}`}
                              className={styles.serviceListItem}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: serviceIndex * 0.05 }}
                            >
                              <span className={styles.serviceItemIcon}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                              <span className={styles.serviceItemTitle}>{service.title}</span>
                              <span className={styles.serviceArrow}>→</span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;