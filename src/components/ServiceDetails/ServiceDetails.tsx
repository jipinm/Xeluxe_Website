import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceData } from '../../data/servicesData';
import styles from './ServiceDetails.module.css';

interface ServiceDetailsProps {
  service: ServiceData;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className={styles.serviceDetails}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div 
          className={styles.heroSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className={styles.heroContent}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.breadcrumb}>
              <Link to="/services" className={styles.breadcrumbLink}>Services</Link>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>{service.name}</span>
            </div>
            
            <h1 className={styles.serviceTitle}>{service.name}</h1>
            <p className={styles.serviceSubtitle}>{service.shortDescription}</p>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img 
              src={service.image} 
              alt={service.name}
              className={styles.serviceImage}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.descriptionCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div 
            className={styles.fullDescription}
            dangerouslySetInnerHTML={{ __html: service.fullDescription }}
          />
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          className={styles.contactCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Contact our experts to discuss your {service.name.toLowerCase()} needs and get a customized solution.
            </p>
            
            <div className={styles.ctaButtons}>
              <Link to="/contact-us" className={styles.primaryButton}>
                Contact Us Today
                <ArrowRight className={styles.buttonIcon} size={18} />
              </Link>
              <Link to="/services" className={styles.secondaryButton}>
                View All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetails;
