import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './WhoWeAreSection.module.css';

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

interface WhoWeAreSectionProps {
  data?: {
    page_title: string;
    page_subtitle: string;
    quote_text: string;
    quote_subtext: string;
    about_content: string;
  };
}

const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({ data }) => {
  const { settings } = useSettings();

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
            {data?.page_title || settings?.who_we_are_title || 'Who We Are'}
          </h2>
          <p className={styles.subtitle}>
            {data?.page_subtitle || settings?.who_we_are_subtitle || 'We partner with clients to engineer safer, better-performing buildings and infrastructure — guiding them from concept to handover and beyond.'}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.contentGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Quote Card */}
          <motion.div className={styles.quoteCard} variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className={styles.quoteIconContainer}>
              <Quote size={48} />
            </div>
            <div className={styles.quoteContent}>
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  <strong>{data?.quote_text || 'Xeluxe is a specialist engineering consultancy.'}</strong>
                </p>
                <p className={styles.quoteSubtext}>
                  {data?.quote_subtext || 'We partner with clients to ensure fire and life safety, enhance operational performance, and improve sustainability across the built environment.'}
                </p>
              </blockquote>
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div className={styles.contentCard} variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div 
              className={styles.cardContent}
              dangerouslySetInnerHTML={{ 
                __html: data?.about_content || '<p>Loading content...</p>' 
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Quote Footer */}
        <motion.div 
          className={styles.quoteFooter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.footerLine}></div>
          <p className={styles.footerText}>
            {settings?.logo_tagline_1 || 'Engineering a Sustainable'} {settings?.logo_tagline_2 || 'and Resilient Future - Together'}
          </p>
          <div className={styles.footerLine}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
