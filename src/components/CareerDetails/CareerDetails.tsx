import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import styles from './CareerDetails.module.css';
import JobApplicationModal from '../JobApplicationModal/JobApplicationModal';

// Career data type
interface CareerData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  aboutRole: string;
}

interface CareerDetailsProps {
  career: CareerData;
}

const CareerDetails: React.FC<CareerDetailsProps> = ({ career }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className={styles.careerDetails}>
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
              <a href="/careers" className={styles.breadcrumbLink}>Careers</a>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>{career.title}</span>
            </div>
            
            <div className={styles.departmentBadge}>{career.department}</div>
            <h1 className={styles.careerTitle}>{career.title}</h1>
            <p className={styles.careerSubtitle}>{career.description}</p>
            
            <div className={styles.careerMeta}>
              <div className={styles.metaItem}>
                <MapPin size={18} />
                <span>{career.location}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={18} />
                <span>{career.type}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={18} />
                <span>{career.experience}</span>
              </div>
              {career.salary && (
                <div className={styles.metaItem}>
                  <DollarSign size={18} />
                  <span>{career.salary}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* About the Role */}
        <motion.div 
          className={styles.descriptionCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={styles.sectionTitle}>About the Role</h2>
          <div 
            className={styles.fullDescription}
            dangerouslySetInnerHTML={{ __html: career.aboutRole }}
          />
        </motion.div>

        {/* Details Grid */}
        <motion.div 
          className={styles.detailsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className={styles.detailCard} variants={itemVariants}>
            <h3 className={styles.detailTitle}>Key Responsibilities</h3>
            {career.responsibilities && career.responsibilities.length > 0 ? (
              <ul className={styles.detailList}>
                {career.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: (career as any).key_responsibilities || '' }} />
            )}
          </motion.div>

          <motion.div className={styles.detailCard} variants={itemVariants}>
            <h3 className={styles.detailTitle}>Requirements</h3>
            {career.requirements && career.requirements.length > 0 ? (
              <ul className={styles.detailList}>
                {career.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: (career as any).requirementsHtml || '' }} />
            )}
          </motion.div>

          <motion.div className={styles.detailCard} variants={itemVariants}>
            <h3 className={styles.detailTitle}>Benefits & Perks</h3>
            {career.benefits && career.benefits.length > 0 ? (
              <ul className={styles.detailList}>
                {career.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: (career as any).benefits_perks || '' }} />
            )}
          </motion.div>
        </motion.div>

        {/* Application CTA */}
        <motion.div 
          className={styles.applicationCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Join Our Team?</h2>
            <p className={styles.ctaDescription}>
              Apply now for the {career.title} position and become part of our mission to engineer a sustainable and resilient future.
            </p>
            
            <div className={styles.ctaButtons}>
              <button onClick={() => setIsModalOpen(true)} className={styles.primaryButton}>
                Apply Now
                <ArrowRight className={styles.buttonIcon} size={18} />
              </button>
              <a href="/careers" className={styles.secondaryButton}>
                View All Positions
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={career.title}
        jobId={career.id}
      />
    </section>
  );
};

export default CareerDetails;