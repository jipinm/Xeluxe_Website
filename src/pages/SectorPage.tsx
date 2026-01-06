import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import styles from './SectorPage.module.css';
import sectorsStyles from '../components/Sectors/Sectors.module.css';
import { projectsApi, API_BASE_URL } from '../services/api';

interface SectorData {
  id: number;
  category_name: string;
  slug: string;
  featured_image: string;
  short_description: string;
  description: string;
  view_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface FeaturedProject {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  location: string;
  featured_image: string;
  gallery_images: string | string[];
  view_order: number;
  is_featured: number | boolean;
  is_active: number | boolean;
  seo_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
}

const SectorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sectorData, setSectorData] = useState<SectorData | null>(null);
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        // Fetch sector details and all projects in parallel
        const [sectorResult, projectsResult] = await Promise.all([
          projectsApi.getSectorBySlug(slug),
          projectsApi.getProjectsByCategory(slug)
        ]);

        if (sectorResult.success && sectorResult.data) {
          setSectorData(sectorResult.data.sector);
        }

        if (projectsResult.success && projectsResult.projects) {
          setProjects(projectsResult.projects);
        }
      } catch (error) {
        console.error('Failed to fetch sector data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectorData();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.sectorPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading sector details...</p>
          <div className={styles.skeletonLayout}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonTwoColumn}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonDescription}>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                <div className={styles.skeletonText} style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className={styles.skeletonProjectsSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonProjectsGrid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.skeletonProjectCard}>
                    <div className={styles.skeletonProjectImage}></div>
                    <div className={styles.skeletonProjectContent}>
                      <div className={styles.skeletonProjectTitle}></div>
                      <div className={styles.skeletonProjectLocation}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sectorData) {
    return (
      <div className={styles.sectorPage}>
        <div className={sectorsStyles.container}>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p>Sector not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sectorPage}>
      {/* Use the same container/padding as Sectors for visual consistency */}
      <div className={sectorsStyles.container}>
        {/* Category Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/sectors" className={styles.breadcrumbLink}>Sectors</a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{sectorData.category_name}</span>
        </div>

        {/* Row 1: Top-left -> Sector title */}
        <div className={sectorsStyles.sectionHeader}>
          <h2 className={sectorsStyles.title}>{sectorData.category_name}</h2>
        </div>

        {/* Row 2: Left banner (50%) and Right description (50%) */}
        <div className={styles.twoColumn}>
          <div className={styles.leftCol}>
            <div className={styles.bannerInner}>
              <img 
                src={`${API_BASE_URL}/${sectorData.featured_image}`} 
                alt={sectorData.category_name} 
                className={styles.bannerImage} 
              />
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.content}>
              <div 
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: sectorData.description }}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Projects */}
        <div style={{ marginTop: '2rem' }}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.featuredGrid}>
            {projects.map(project => (
              <div
                key={project.id}
                className={styles.projectCard}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <a 
                  href={`/project/${project.slug}`} 
                  className={styles.cardLink}
                >
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
                </a>
              </div>
            ))}
            {projects.length === 0 && <p>No projects available for this sector.</p>}
          </div>
        </div>
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

export default SectorPage;
