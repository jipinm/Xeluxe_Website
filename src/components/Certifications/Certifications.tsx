import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { recognitionsApi, type RecognitionItem } from '../../services/api';
import styles from './Certifications.module.css';

// Animation variants for entrance effects only
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const Certifications: React.FC = () => {
  const [recognitions, setRecognitions] = useState<RecognitionItem[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageSubtitle, setPageSubtitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        setLoading(true);
        const response = await recognitionsApi.getRecognitions();
        setRecognitions(response.recognitions);
        setPageTitle(response.settings.page_title);
        setPageSubtitle(response.settings.page_subtitle);
      } catch (error) {
        console.error('Error fetching recognitions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecognitions();
  }, []);

  return (
    <section id="certifications" className={styles.certifications}>
      <div className={styles.container}>
        {!loading && (
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className={styles.title}>
              {pageTitle}
            </h2>
            <p className={styles.subtitle}>
              {pageSubtitle}
            </p>
          </motion.div>
        )}
        
        
        {/* Certifications Grid */}
        {!loading && (
          <motion.div 
            className={styles.certificationsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {recognitions.map((recognition) => (
              <motion.div key={recognition.id} className={styles.certCard} variants={itemVariants} transition={{ duration: 0.3, ease: "easeOut" }}>
                <div className={styles.certLogo}>
                  <img 
                    src={`${API_BASE_URL}/${recognition.certificate_image}`}
                    alt={recognition.organization_name || `Recognition ${recognition.id}`}
                    className={styles.certImage}
                  />
                </div>
                {(recognition.organization_name || recognition.recognition_title) && (
                  <div className={styles.certInfo}>
                    {recognition.organization_name && <h3 className={styles.certName}>{recognition.organization_name}</h3>}
                    {recognition.recognition_title && <p className={styles.certSubtitle}>{recognition.recognition_title}</p>}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
