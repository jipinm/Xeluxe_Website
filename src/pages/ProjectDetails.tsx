import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectsApi, API_BASE_URL } from '../services/api';
import type { ProjectDetail, RelatedProject } from '../services/api';
import SEO from '../components/SEO/SEO';
import type { SeoData } from '../services/api';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './ProjectDetails.module.css';

const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await projectsApi.getProjectBySlug(slug);
        if (response.success && response.data) {
          setProject(response.data.project);
          setRelatedProjects(response.data.related_projects || []);
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
        <p className={styles.loadingText}>Loading project details...</p>
        <div className={styles.skeletonLayout}>
          <div className={styles.skeletonBreadcrumb}></div>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonMeta}>
            <div className={styles.skeletonMetaItem}></div>
            <div className={styles.skeletonMetaItem}></div>
          </div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText} style={{ width: '95%' }}></div>
            <div className={styles.skeletonText} style={{ width: '90%' }}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText} style={{ width: '85%' }}></div>
          </div>
          <div className={styles.skeletonGallery}>
            <div className={styles.skeletonGalleryTitle}></div>
            <div className={styles.skeletonGalleryGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonGalleryImage}></div>
              ))}
            </div>
          </div>
          <div className={styles.skeletonRelated}>
            <div className={styles.skeletonRelatedTitle}></div>
            <div className={styles.skeletonRelatedGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonRelatedCard}>
                  <div className={styles.skeletonRelatedImage}></div>
                  <div className={styles.skeletonRelatedContent}>
                    <div className={styles.skeletonRelatedCardTitle}></div>
                    <div className={styles.skeletonRelatedLocation}></div>
                    <div className={styles.skeletonRelatedText}></div>
                    <div className={styles.skeletonRelatedText} style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Project Not Found</h1>
        <p>The requested project could not be found.</p>
      </div>
    );
  }

  // Convert project data to SEO data format
  const seoData: Partial<SeoData> = {
    meta_description: project.meta_description || project.short_description,
    canonical_url: project.canonical_url,
    og_title: project.og_title || project.title,
    og_description: project.og_description || project.short_description,
    og_image: project.og_image ? `${API_BASE_URL}/${project.og_image}` : `${API_BASE_URL}/${project.featured_image}`,
    og_type: project.og_type,
    twitter_card: project.twitter_card,
    twitter_title: project.twitter_title || project.title,
    twitter_description: project.twitter_description || project.short_description,
    twitter_image: project.twitter_image ? `${API_BASE_URL}/${project.twitter_image}` : `${API_BASE_URL}/${project.featured_image}`,
    schema_type: project.schema_type,
    schema_data: project.schema_data,
  };

  return (
    <>
      <SEO seoData={seoData} />
      <InternalHeader pageTitle="Project" />
      <div className={styles.projectDetailsPage}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <a href="/projects" className={styles.breadcrumbLink}>Projects</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{project.title}</span>
          </nav>

          {/* Project Title */}
          <h1 className={styles.projectTitle}>{project.title}</h1>

          {/* Location & Category */}
          <div className={styles.projectMeta}>
            <span className={styles.location}>{project.location}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.category}>{project.category_name}</span>
          </div>

          {/* Content Area */}
          <div className={styles.contentWrapper}>
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>

          {/* Gallery Images */}
          {project.gallery_images && project.gallery_images.length > 0 && (
            <div className={styles.gallery}>
              <h2 className={styles.galleryTitle}>Project Gallery</h2>
              <div className={styles.galleryGrid}>
                {project.gallery_images.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img 
                      src={`${API_BASE_URL}/${image}`} 
                      alt={`${project.title} - Image ${index + 1}`}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className={styles.relatedProjects}>
              <h2 className={styles.relatedTitle}>Related Projects</h2>
              <div className={styles.relatedGrid}>
                {relatedProjects.map((relatedProject) => (
                  <a
                    key={relatedProject.id}
                    href={`/project/${relatedProject.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedImageWrapper}>
                      <img
                        src={`${API_BASE_URL}/${relatedProject.featured_image}`}
                        alt={relatedProject.title}
                        className={styles.relatedImage}
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <h3 className={styles.relatedProjectTitle}>{relatedProject.title}</h3>
                      <p className={styles.relatedLocation}>{relatedProject.location}</p>
                      <p className={styles.relatedDescription}>
                        {relatedProject.short_description}
                      </p>
                      <span className={styles.viewProject}>View Project →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
