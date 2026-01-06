import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './OurProjects.module.css';
import { getProjectsByCategory, projectsData } from '../../data/projectsData';

// Simple modal + slider for project details
type SelectedProject = {
  id: string;
  title: string;
  images: string[];
  location?: string;
  category?: string;
  services?: string[];
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
};

const OurProjects: React.FC = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();
  const projectsByCategory = getProjectsByCategory();
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % (selectedProject.images.length || 1));
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + (selectedProject.images.length || 1)) % (selectedProject.images.length || 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  const openProject = (project: SelectedProject) => {
    // Build a demo image set: include the project's own images first,
    // then append first images from other projects until we have up to 6 images.
    const demoImages: string[] = [];
    const seen = new Set<string>();

    (project.images || []).forEach(img => { demoImages.push(img); seen.add(img); });

    for (const p of projectsData) {
      if (demoImages.length >= 6) break;
      const img = p.images && p.images.length ? p.images[0] : undefined;
      if (img && !seen.has(img)) {
        demoImages.push(img);
        seen.add(img);
      }
    }

    const projectWithDemo = { ...project, images: demoImages };
    setSelectedProject(projectWithDemo);
    setActiveIndex(0);
  };

  const closeProject = () => setSelectedProject(null);

  // Animation variants for staggered entrance
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

  const categoryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="our-projects" className={styles.ourProjects} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>
            {settings?.featured_projects_title || 'Complex environments. Engineered Results.'}
          </h2>
          {settings?.featured_projects_subtitle && (
            <p className={styles.subtitle}>
              {settings.featured_projects_subtitle}
            </p>
          )}
        </motion.div>
        
        {Object.entries(projectsByCategory).map(([category, allProjects]) => {
          // Take only the first 3 projects for each category
          const projects = allProjects.slice(0, 3);
          const categorySlug = slugify(category);
          
          return (
            <motion.div 
              key={category}
              className={styles.categorySection}
              variants={categoryVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{category}:</h3>
                <button 
                  className={styles.moreProjectsButton}
                  onClick={() => navigate(`/sector/${categorySlug}`)}
                >
                  More Projects
                </button>
              </div>
              
              <motion.div 
                className={styles.projectsGrid}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className={styles.projectCard}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div
                      className={styles.cardImage}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${project.title} details`}
                      onClick={() => openProject(project as SelectedProject)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openProject(project as SelectedProject); }}
                  >
                      {project.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={project.title}
                          className={`${styles.projectImage} ${project.images.length > 1 ? styles.multipleImages : ''}`}
                          style={{ 
                            width: project.images.length > 1 ? '48%' : '100%',
                            marginRight: project.images.length > 1 && index === 0 ? '4%' : '0'
                          }}
                        />
                      ))}
                    </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <div className={styles.projectMeta}>
                        <div className={styles.metaItem}>
                          <MapPin size={14} />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )})}
        {selectedProject && (
          <div className={styles.modalOverlay} onClick={closeProject} role="dialog" aria-modal="true">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={closeProject} aria-label="Close">×</button>
              <div className={styles.modalBody}>
                <div className={styles.slider}>
                  <img src={selectedProject.images[activeIndex]} alt={selectedProject.title} className={styles.modalImage} />
                </div>
                <div className={styles.modalContent}>
                  <h3>{selectedProject.title}</h3>
                  <p className={styles.modalLocation}>{selectedProject.location}</p>
                  <h4>Services performed</h4>
                  <ul>
                    {(selectedProject.services && selectedProject.services.length ? selectedProject.services : ['Fire strategy', 'MEP coordination', 'Egress & evacuation design']).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <div className={styles.thumbnails}>
                    {selectedProject.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${selectedProject.title} thumbnail ${i + 1}`}
                        className={`${styles.thumbnail} ${i === activeIndex ? styles.active : ''}`}
                        onClick={() => setActiveIndex(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProjects;
