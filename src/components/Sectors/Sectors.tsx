import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';
import { projectsApi } from '../../services/api';
import type { FeaturedSectorItem } from '../../services/api';
import styles from './Sectors.module.css';

// Animation variants for entrance effects only
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
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

const Sectors: React.FC = () => {
  const { settings } = useSettings();
  const [featuredSectors, setFeaturedSectors] = useState<FeaturedSectorItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchFeaturedSectors = async () => {
      try {
        const response = await projectsApi.getFeaturedSectors();
        if (response.success && response.data) {
          setFeaturedSectors(response.data);
        }
      } catch (error) {
        console.error('Error fetching featured sectors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSectors();
  }, []);

  // Parse HTML description to extract text
  const parseDescription = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent?.trim() || '';
  };

  return (
    <section id="sectors" className={styles.sectors}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={styles.title}>
            {settings?.sectors_title || 'Specialist consultancy across critical, complex, and high-performance environments.'}
          </h2>
          <p className={styles.subtitle}>
            {settings?.sectors_subtitle || 'From complex developments to healthcare, aviation, and hospitality — we support safer, smarter delivery across every phase of the built environment.'}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.sectorsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {loading && <div>Loading sectors...</div>}
          {!loading && featuredSectors.length === 0 && <div>No featured sectors found</div>}
          {!loading && featuredSectors.length > 0 && featuredSectors.map((sector) => (
            <motion.a 
              key={sector.id} 
              href={`/sector/${sector.slug}`}
              className={styles.sectorCard} 
              variants={itemVariants} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              <div className={styles.cardContent}>
                <div className={styles.imageWrapper}>
                  {sector.featured_image && (
                    <img 
                      src={`${API_BASE_URL}/${sector.featured_image}`}
                      alt={sector.category_name}
                      className={styles.sectorImage}
                    />
                  )}
                </div>
                <h3 className={styles.sectorName}>{sector.category_name}</h3>
                <p className={styles.sectorDescription} style={{marginTop: '0.5rem'}}>
                  {parseDescription(sector.short_description)}
                </p>
              </div>
              <div className={styles.cardGlow}></div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.sectionFooter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;
