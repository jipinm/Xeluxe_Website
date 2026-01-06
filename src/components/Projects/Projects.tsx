import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { projectsApi } from '../../services/api';
import type { FeaturedProjectItem } from '../../services/api';
import styles from './Projects.module.css';

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

const Projects: React.FC = () => {
  const { settings } = useSettings();
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await projectsApi.getFeaturedProjects();
        if (response.success && response.data) {
          setFeaturedProjects(response.data);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <section id="projects" className={styles.projects}>
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
            {settings?.featured_projects_title || 'Complex environments. Engineered Results.'}
          </h2>
          <p className={styles.subtitle}>
            {settings?.featured_projects_subtitle || 'We partner across sectors and project scales — from giga developments to hotels and airports. Here are just a few highlights from our portfolio.'}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.projectsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {loading && <div>Loading projects...</div>}
          {!loading && featuredProjects.length === 0 && <div>No featured projects found</div>}
          {!loading && featuredProjects.length > 0 && featuredProjects.map((project) => (
            <motion.a
                key={project.id}
                href={`/project/${project.slug}`}
                className={styles.projectCard}
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.imageWrapper}>
                  {project.featured_image && (
                    <img 
                      src={`${API_BASE_URL}/${project.featured_image}`}
                      alt={project.title}
                      className={styles.projectImage}
                    />
                  )}
                </div>
              
              <div className={styles.cardContent}>
                <div className={styles.projectHeader}>
                  <span className={styles.category}>{project.category_name}</span>
                  <h3 className={styles.projectName}>{project.title}</h3>
                </div>
                
                <div className={styles.projectInfo}>
                  <div className={styles.metaItem}>
                    <MapPin size={14} />
                    <span className={styles.location}>{project.location}</span>
                  </div>
                </div>
              </div>
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

export default Projects;
