import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { projectsApi } from '../../services/api';
import type { FeaturedProjectItem } from '../../services/api';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const { settings } = useSettings();
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await projectsApi.getFeaturedProjects();
        
        if (response.success && response.data) {
          setFeaturedProjects(response.data);
        } else {
          setError('Failed to load projects');
        }
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            {settings?.featured_projects_title || 'Complex environments. Engineered Results.'}
          </h2>
          <p className={styles.subtitle}>
            {settings?.featured_projects_subtitle || 'We partner across various project scales — from giga developments to hotels and airports. Here are just a few highlights from our portfolio.'}
          </p>
        </div>
        
        <div className={styles.projectsGrid}>
          {loading && (
            <div className={styles.statusMessage}>
              Loading projects...
            </div>
          )}
          
          {error && (
            <div className={styles.statusMessage} style={{ color: '#E26A23' }}>
              {error}
            </div>
          )}
          
          {!loading && !error && featuredProjects.length === 0 && (
            <div className={styles.statusMessage}>
              No featured projects available at the moment.
            </div>
          )}
          
          {!loading && featuredProjects.length > 0 && featuredProjects.map((project) => (
            <a
              key={project.id}
              href={`/project/${project.slug}`}
              className={styles.projectCard}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
