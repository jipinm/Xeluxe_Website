import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './IndustrySectors.module.css';
import { API_BASE_URL } from '../../services/api';
import type { FeaturedSectorItem } from '../../services/api';

const IndustrySectors: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();
  const [sectors, setSectors] = useState<FeaturedSectorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/public-api/project-sectors.php`);
        const data = await response.json();
        if (data.success && data.data) {
          setSectors(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch sectors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

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

  const [hoveredSectorId, setHoveredSectorId] = useState<number | null>(null);

  return (
    <section id="industry-sectors" className={styles.industrySectors} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>
            {settings?.sectors_title || ''}
          </h2>
          <p className={styles.subtitle}>
            {settings?.sectors_subtitle || ''}
          </p>
        </motion.div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
            </div>
            <p className={styles.loadingText}>Loading sectors...</p>
            <div className={styles.sectorsGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                    <div className={styles.skeletonText} style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            className={styles.sectorsGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {sectors.map((sector) => (
              <motion.a
                key={sector.id}
                href={`/sector/${sector.slug}`}
                className={styles.sectorCard}
                variants={cardVariants}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', position: 'relative' }}
                onMouseEnter={() => setHoveredSectorId(sector.id)}
                onMouseLeave={() => setHoveredSectorId(null)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={`${API_BASE_URL}/${sector.featured_image}`} 
                      alt={sector.category_name} 
                      className={styles.sectorImage} 
                    />
                  </div>
                  <h3 className={styles.sectorName}>{sector.category_name}</h3>
                  <div 
                    className={styles.sectorDescription}
                    dangerouslySetInnerHTML={{ __html: sector.short_description }}
                  />
                </div>
                <div className={styles.cardGlow}></div>
                {hoveredSectorId === sector.id && (
                  <div className={styles.sectorPopup}>
                    <img src={`${API_BASE_URL}/${sector.featured_image}`} alt={sector.category_name} className={styles.popupImage} />
                    <div className={styles.popupContent}>
                      <h4 className={styles.popupTitle}>{sector.category_name}</h4>
                      {/* The API does not provide a location field, so skip it */}
                      <div className={styles.popupDescription} dangerouslySetInnerHTML={{ __html: sector.short_description }} />
                    </div>
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
        <motion.div 
          className={styles.footerTagline}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.footerLine}></div>
          <p className={styles.footerText}>Engineering a Sustainable and Resilient Future – Together</p>
          <div className={styles.footerLine}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySectors;
