import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { blogApi, projectsApi, servicesApi, API_BASE_URL } from '../../services/api';
import type { BlogPost, BlogFilters, ProjectCategory } from '../../services/api';
import styles from './Blog.module.css';

interface ServiceCategory {
  id: number;
  category_name: string;
  slug: string;
}

const Blog: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [sectors, setSectors] = useState<ProjectCategory[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0
  });
  
  // Filter state
  const [filters, setFilters] = useState<BlogFilters>({
    sector_id: undefined,
    service_id: undefined,
    type: '',
    sort: 'latest',
    page: 1,
    limit: 9
  });

  // Static insight types
  const insightTypes = ['Article', 'Case Study', 'News', 'Guide', 'Analysis'];

  // Fetch sectors and service categories on mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [sectorsRes, servicesRes] = await Promise.all([
          projectsApi.getProjectCategories(),
          servicesApi.getServiceCategories()
        ]);
        
        if (sectorsRes.success && sectorsRes.data) {
          setSectors(sectorsRes.data);
        }
        
        if (servicesRes.success && servicesRes.data) {
          setServiceCategories(servicesRes.data);
        }
      } catch (error) {
        console.error('Failed to fetch dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  // Fetch blogs when filters change
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getBlogs(filters);
        
        if (response.success) {
          setBlogs(response.data);
          setPagination({
            current_page: response.pagination.current_page,
            total_pages: response.pagination.total_pages,
            total_items: response.pagination.total_items
          });
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filters]);

  const handleFilterChange = (filterType: keyof BlogFilters, value: string | number) => {
    setFilters(prev => ({ 
      ...prev, 
      [filterType]: value === '' ? undefined : value,
      page: 1 // Reset to page 1 when filters change
    }));
  };

  const handleFilterSubmit = () => {
    // Trigger re-fetch by updating a dependency
    setFilters(prev => ({ ...prev }));
  };

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

  return (
    <section className={styles.blog} ref={ref}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>
            Latest Blog Posts
          </h2>
          <p className={styles.subtitle}>
            Stay informed with the latest trends, insights, and best practices in fire safety engineering 
            from our team of experts and industry professionals.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <select 
              className={styles.filterSelect}
              value={filters.sector_id || ''}
              onChange={(e) => handleFilterChange('sector_id', e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">All Sectors...</option>
              {sectors.map(sector => (
                <option key={sector.id} value={sector.id}>{sector.category_name}</option>
              ))}
            </select>
            <ChevronDown className={styles.selectIcon} size={16} />
          </div>

          <div className={styles.filterGroup}>
            <select 
              className={styles.filterSelect}
              value={filters.service_id || ''}
              onChange={(e) => handleFilterChange('service_id', e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">All Services...</option>
              {serviceCategories.map(service => (
                <option key={service.id} value={service.id}>{service.category_name}</option>
              ))}
            </select>
            <ChevronDown className={styles.selectIcon} size={16} />
          </div>

          <div className={styles.filterGroup}>
            <select 
              className={styles.filterSelect}
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types...</option>
              {insightTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className={styles.selectIcon} size={16} />
          </div>

          <button 
            className={styles.filterButton}
            onClick={handleFilterSubmit}
          >
            FILTER
          </button>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
            </div>
            <p className={styles.loadingText}>Loading insights...</p>
            <div className={styles.blogGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonBadge}></div>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText} style={{ width: '80%' }}></div>
                    <div className={styles.skeletonFooter}>
                      <div className={styles.skeletonDate}></div>
                      <div className={styles.skeletonButton}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className={styles.noPosts}>No blog posts found. Try adjusting your filters.</div>
        ) : (
          <motion.div 
            className={styles.blogGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {blogs.map((post) => (
              <motion.article 
                key={post.id}
                className={styles.blogCard}
                variants={cardVariants}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  rotateX: 3,
                  rotateY: 3,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: 1000 
                }}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={`${API_BASE_URL}/${post.featured_image}`} 
                    alt={post.title}
                    className={styles.blogImage}
                  />
                  <span className={styles.blogType}>{post.blog_type}</span>
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.blogMeta}>
                    {post.sector_name && (
                      <span className={styles.metaBadge}>{post.sector_name}</span>
                    )}
                    {post.service_name && (
                      <span className={styles.metaBadge}>{post.service_name}</span>
                    )}
                  </div>
                  
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDescription}>{post.short_description}</p>
                  
                  <div className={styles.postFooter}>
                    <div className={styles.postDate}>
                      <Calendar size={16} />
                      <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <a 
                      href={`/blog-details/${post.slug}`}
                      className={styles.readButton}
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} className={styles.arrow} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && pagination.total_pages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              disabled={pagination.current_page === 1}
              onClick={() => handleFilterChange('page', pagination.current_page - 1)}
            >
              Previous
            </button>
            
            <span className={styles.pageInfo}>
              Page {pagination.current_page} of {pagination.total_pages}
            </span>
            
            <button
              className={styles.pageButton}
              disabled={pagination.current_page === pagination.total_pages}
              onClick={() => handleFilterChange('page', pagination.current_page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
