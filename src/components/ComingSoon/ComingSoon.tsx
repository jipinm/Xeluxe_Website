import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import styles from './ComingSoon.module.css';

const ComingSoon: React.FC = () => {
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
    <section className={styles.comingSoon}>
      <div className={styles.container}>
        <motion.div 
          className={styles.bannerContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.iconWrapper}>
            <Clock className={styles.bannerIcon} />
          </div>
          <h1 className={styles.bannerTitle}>Coming Soon</h1>
          <p className={styles.bannerDescription}>
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
