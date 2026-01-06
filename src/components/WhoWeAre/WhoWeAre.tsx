import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './WhoWeAre.module.css';

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

const WhoWeAre: React.FC = () => {
  const { settings } = useSettings();

  const stats = [
    {
      number: settings?.who_we_are_stat1_heading || '1600+',
      label: settings?.who_we_are_stat1_text || 'PROJECTS COMPLETED',
      color: '#E26A23'
    },
    {
      number: settings?.who_we_are_stat2_heading || '50+',
      label: settings?.who_we_are_stat2_text || 'PROFESSIONALS',
      color: '#E26A23'
    },
    {
      number: settings?.who_we_are_stat3_heading || '4 Countries',
      label: settings?.who_we_are_stat3_text || 'UAE, KSA, INDIA, IRELAND',
      color: '#E26A23'
    },
    {
      number: settings?.who_we_are_stat4_heading || 'ISO 9001 Certified',
      label: settings?.who_we_are_stat4_text || 'QUALITY MANAGEMENT SYSTEM',
      color: '#E26A23'
    }
  ];

  return (
    <section id="who-we-are" className={styles.whoWeAre}>
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
            {settings?.who_we_are_title || 'Who We Are'}
          </h2>
          <p className={styles.subtitle}>
            {settings?.who_we_are_subtitle || 'We partner with clients to engineer safer, better-performing buildings and infrastructure — guiding them from concept to handover and beyond.'}
          </p>
        </motion.div>

        {/* Statistics Section */}
        <div className={styles.statsSection}>
          <motion.div 
            className={styles.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className={styles.statCard} variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
                <div className={styles.statNumber} style={{ color: stat.color }}>
                  {stat.number}
                </div>
                <div className={styles.statLabel}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
