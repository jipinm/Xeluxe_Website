import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ProjectData } from '../../data/projectsData';
import styles from './ProjectDetails.module.css';

interface ProjectDetailsProps {
  project: ProjectData;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
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
    <section className={styles.projectDetails}>
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
              <Link to="/projects" className={styles.breadcrumbLink}>Projects</Link>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>{project.title}</span>
            </div>
            
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <p className={styles.projectSubtitle}>{project.location}</p>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img 
              src={project.images[0]} 
              alt={project.title}
              className={styles.projectImage}
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
          <div className={styles.fullDescription}>
            <h3>Project Overview</h3>
            <p>
              {project.title} is located in {project.location} and represents our expertise in {project.category.toLowerCase()} projects. 
              This project showcases our commitment to delivering innovative engineering solutions across complex environments.
            </p>
          </div>
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
            <h2 className={styles.ctaTitle}>Interested in Similar Solutions?</h2>
            <p className={styles.ctaDescription}>
              Contact our experts to discuss your project requirements and learn how we can deliver exceptional results for your development.
            </p>
            
            <div className={styles.ctaButtons}>
              <Link to="/contact-us" className={styles.primaryButton}>
                Contact Us
                <ArrowRight className={styles.buttonIcon} size={18} />
              </Link>
              <Link to="/projects" className={styles.secondaryButton}>
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetails;
