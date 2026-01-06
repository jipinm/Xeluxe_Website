import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../ContactForm/ContactForm';
import styles from './ContactUs.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface ContactSettings {
  general_enquiry_email: string;
  general_enquiry_person: string;
  managing_partner_email: string;
  managing_partner_person: string;
}

interface Address {
  id: number;
  location: string;
  address: string;
  display_order: number;
}

const ContactUs: React.FC = () => {
  const [, setContactSettings] = useState<ContactSettings | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, addressesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/public-api/settings.php`),
          fetch(`${API_BASE_URL}/public-api/addresses.php`)
        ]);

        const settingsData = await settingsRes.json();
        const addressesData = await addressesRes.json();

        if (settingsData.success && settingsData.settings?.contact) {
          setContactSettings(settingsData.settings.contact);
        }

        if (addressesData.success && addressesData.data) {
          setAddresses(addressesData.data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <section className={styles.contactUs}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading contact information...</p>
          <div className={styles.skeletonLayout}>
            {/* Header Skeleton */}
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonSubtitle}></div>
              <div className={styles.skeletonSubtitle} style={{ width: '85%' }}></div>
            </div>
            {/* Form Skeleton */}
            <div className={styles.skeletonForm}>
              <div className={styles.skeletonFormRow}>
                <div className={styles.skeletonInput}></div>
                <div className={styles.skeletonInput}></div>
              </div>
              <div className={styles.skeletonFormRow}>
                <div className={styles.skeletonInput}></div>
                <div className={styles.skeletonInput}></div>
              </div>
              <div className={styles.skeletonTextarea}></div>
              <div className={styles.skeletonButton}></div>
            </div>
            {/* Map and Offices Skeleton */}
            <div className={styles.skeletonMapSection}>
              <div className={styles.skeletonMap}></div>
              <div className={styles.skeletonOffices}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={styles.skeletonOffice}>
                    <div className={styles.skeletonOfficeTitle}></div>
                    <div className={styles.skeletonOfficeText}></div>
                    <div className={styles.skeletonOfficeText} style={{ width: '80%' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactUs}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={styles.title}>
            Let's Connect
          </h2>
          <p className={styles.subtitle}>
            At Xeluxe, we partner with our clients to shape safer, more resilient, and future-ready built 
            environments—providing specialised engineering consultancy at every stage, from concept to 
            handover and beyond.
          </p>
          <p className={styles.subtitle}>Let’s connect to start the conversation—together we can deliver solutions that protect people, enhance resilience, and shape the built environment for the future.</p>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className={styles.formSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <ContactForm />
        </motion.div>
      </div>
      {/* Map and Offices Section */}
      <motion.div 
        className={styles.mapSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.mapOfficesContainer}>
          <div className={styles.mapContainer}>
            <img 
              src="/map.png" 
              alt="Xeluxe Location Map" 
              className={styles.mapImage}
            />
          </div>
          
          <div className={styles.officesContainer}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className={styles.office}>
                  <h3>{address.location}</h3>
                  <p dangerouslySetInnerHTML={{ __html: address.address.replace(/\n/g, '<br />') }} />
                </div>
              ))
            ) : (
              <div className={styles.office}>
                <h3>Contact Us</h3>
                <p>Please use the contact form to get in touch.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
