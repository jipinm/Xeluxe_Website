import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { servicesApi, API_BASE_URL } from '../services/api';
import type { ServiceDetail, RelatedService } from '../services/api';
import SEO from '../components/SEO/SEO';
import type { SeoData } from '../services/api';
import styles from './ServiceDetails.module.css';

const ServiceDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // const navigate = useNavigate();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [relatedServices, setRelatedServices] = useState<RelatedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await servicesApi.getServiceBySlug(slug);
        
        if (response.success && response.data) {
          setService(response.data.service);
          setRelatedServices(response.data.related_services || []);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // Convert service SEO data to SeoData format
  const seoData: SeoData | null = service ? {
    id: service.id,
    page_identifier: `service-${service.slug}`,
    page_name: service.title,
    meta_title: service.meta_title,
    meta_description: service.meta_description,
    meta_keywords: service.meta_keywords,
    canonical_url: service.canonical_url,
    robots_index: service.robots_index,
    robots_follow: service.robots_follow,
    og_title: service.og_title,
    og_description: service.og_description,
    og_image: service.og_image,
    og_type: 'article',
    twitter_card: service.twitter_card,
    twitter_title: service.twitter_title,
    twitter_description: service.twitter_description,
    twitter_image: null,
    schema_type: 'Service',
    schema_data: null,
    hreflang_tags: null,
    custom_head_tags: null,
  } : null;
  
  if (!slug) {
    return <Navigate to="/services" replace />;
  }

  if (loading) {
    return (
      <div className={styles.serviceDetailsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading service details...</p>
          <div className={styles.skeletonLayout}>
            <div className={styles.skeletonBreadcrumb}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText} style={{ width: '95%' }}></div>
              <div className={styles.skeletonText} style={{ width: '90%' }}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText} style={{ width: '85%' }}></div>
            </div>
            <div className={styles.skeletonRelated}>
              <div className={styles.skeletonRelatedTitle}></div>
              <div className={styles.skeletonRelatedGrid}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.skeletonRelatedCard}>
                    <div className={styles.skeletonRelatedImage}></div>
                    <div className={styles.skeletonRelatedContent}>
                      <div className={styles.skeletonRelatedCardTitle}></div>
                      <div className={styles.skeletonRelatedText}></div>
                      <div className={styles.skeletonRelatedText} style={{ width: '80%' }}></div>
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
  
  if (error || !service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className={styles.serviceDetailsPage}>
      <SEO seoData={seoData} />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className="container">
            {/* Category Breadcrumb */}
            <div className={styles.breadcrumb}>
              <a href="/services" className={styles.breadcrumbLink}>Services</a>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{service.category_name}</span>
            </div>

            {/* Service Title */}
            <h1 className={styles.serviceTitle}>{service.title}</h1>

            {/* Main Content - Bootstrap HTML */}
            <div 
              className={styles.serviceContentHtml}
              dangerouslySetInnerHTML={{ __html: service.content }}
            />

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className={styles.relatedServices}>
                <h2 className={styles.relatedTitle}>Related Services</h2>
                <div className={styles.relatedGrid}>
                  {relatedServices.map((relatedService) => (
                    <a
                      key={relatedService.id}
                      href={`/service/${relatedService.slug}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImageWrapper}>
                        <img
                          src={`${API_BASE_URL}/${relatedService.featured_image}`}
                          alt={relatedService.title}
                          className={styles.relatedImage}
                        />
                      </div>
                      <div className={styles.relatedContent}>
                        <h3 className={styles.relatedServiceTitle}>{relatedService.title}</h3>
                        <p className={styles.relatedDescription}>
                          {relatedService.short_description}
                        </p>
                        <span className={styles.readMore}>Learn More →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailsPage;
