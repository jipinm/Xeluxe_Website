import React from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../../services/api';
import styles from './Leadership.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface LeadershipProps {
  data?: {
    leadership_title: string;
    leadership_subtitle: string;
  };
  teamMembers?: TeamMember[];
}

const Leadership: React.FC<LeadershipProps> = ({ data, teamMembers = [] }) => {

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
    <section id="leadership" className={styles.leadership}>
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
            {data?.leadership_title || 'Leadership & Technical Expertise'}
          </h2>
          <p className={styles.subtitle}>
            {data?.leadership_subtitle || "Xeluxe's leadership team combines global project experience, technical depth, and regulatory expertise to support complex developments across the built environment. Our directors bring specialised knowledge across all core service lines, ensuring senior oversight and delivery excellence on every project."}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.teamGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className={styles.memberCard}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.photoContainer}>
                  <img 
                    src={`${API_BASE_URL}/${member.photo_path}`} 
                    alt={member.name}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberDesignation}>{member.designation}</p>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <p className={styles.description}>{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
