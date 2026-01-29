import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './Projects.module.css';
import { API_BASE_URL } from '../services/api';

interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  location: string;
  featured_image: string;
}

interface SectorWithProjects {
  id: number;
  category_name: string;
  slug: string;
  featured_image: string;
  short_description: string;
  projects: Project[];
}

const Projects: React.FC = () => {
  const [sectorsWithProjects, setSectorsWithProjects] = useState<SectorWithProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        
        // First, fetch all sectors
        const sectorsResponse = await fetch(`${API_BASE_URL}/public-api/project-sectors.php`);
        const sectorsResult = await sectorsResponse.json();

        if (sectorsResult.success && sectorsResult.data) {
          // Then, fetch projects for each sector
          const sectorsWithProjectsData = await Promise.all(
            sectorsResult.data.map(async (sector: SectorWithProjects) => {
              try {
                const projectsResponse = await fetch(
                  `${API_BASE_URL}/public-api/projects.php?action=by-category&category=${sector.slug}`
                );
                const projectsResult = await projectsResponse.json();
                
                return {
                  ...sector,
                  projects: projectsResult.success && projectsResult.projects ? projectsResult.projects : []
                };
              } catch (error) {
                console.error(`Failed to fetch projects for ${sector.category_name}:`, error);
                return {
                  ...sector,
                  projects: []
                };
              }
            })
          );

          // Filter out sectors with no projects
          const sectorsWithProjects = sectorsWithProjectsData.filter(
            sector => sector.projects.length > 0
          );
          
          setSectorsWithProjects(sectorsWithProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  if (loading) {
    return (
      <div className={styles.projectsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading projects...</p>
          <div className={styles.skeletonLayout}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonSection}>
                <div className={styles.skeletonSectorTitle}></div>
                <div className={styles.skeletonProjectsGrid}>
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className={styles.skeletonProjectCard}>
                      <div className={styles.skeletonProjectImage}></div>
                      <div className={styles.skeletonProjectContent}>
                        <div className={styles.skeletonProjectTitle}></div>
                        <div className={styles.skeletonProjectLocation}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <InternalHeader pageTitle="Our Projects" />
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Projects</h1>
          <p className={styles.pageSubtitle}>
            Explore our comprehensive portfolio of projects across various sectors
          </p>
        </div>

        {sectorsWithProjects.map((sector) => (
          <div key={sector.id} className={styles.sectorSection}>
            <div className={styles.sectorHeader}>
              <h2 className={styles.sectorTitle}>{sector.category_name}</h2>
              <Link to={`/sector/${sector.slug}`} className={styles.viewSectorLink}>
                View Sector Details →
              </Link>
            </div>

            {sector.projects.length > 0 ? (
              <div className={styles.projectsGrid}>
                {sector.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className={styles.projectCard}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <Link to={`/project/${project.slug}`} className={styles.cardLink}>
                      <div className={styles.imgWrap}>
                        <img
                          src={`${API_BASE_URL}/${project.featured_image}`}
                          alt={project.title}
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectLocation}>{project.location}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noProjects}>No projects available for this sector.</p>
            )}
          </div>
        ))}

        {sectorsWithProjects.length === 0 && !loading && (
          <div className={styles.noData}>
            <p>No projects available at the moment.</p>
          </div>
        )}
      </div>

      {/* Popup rendered via Portal */}
      {hoveredProject && createPortal(
        <div className={styles.projectPopup}>
          <img
            src={`${API_BASE_URL}/${hoveredProject.featured_image}`}
            alt={hoveredProject.title}
            className={styles.popupImage}
          />
          <div className={styles.popupContent}>
            <h4 className={styles.popupTitle}>{hoveredProject.title}</h4>
            <p className={styles.popupLocation}>{hoveredProject.location}</p>
            <p className={styles.popupDescription}>
              {hoveredProject.short_description}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Projects;
