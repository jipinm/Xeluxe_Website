import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import styles from './BlogDetails.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any | null>(null);
  const [otherBlogs, setOtherBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    fetch(`${API_BASE_URL}/public-api/blog.php?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.blog) {
          setBlog(data.data.blog);
          setOtherBlogs(data.data.other_blogs || []);
          setError('');
        } else {
          setError('Blog post not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch blog details');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
        <p className={styles.loadingText}>Loading blog post...</p>
        <div className={styles.skeletonLayout}>
          <div className={styles.skeletonHero}>
            <div className={styles.skeletonHeroContent}>
              <div className={styles.skeletonBreadcrumb}></div>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonSubtitle}></div>
              <div className={styles.skeletonMeta}>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
              </div>
            </div>
            <div className={styles.skeletonHeroImage}></div>
          </div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText} style={{ width: '95%' }}></div>
            <div className={styles.skeletonText} style={{ width: '90%' }}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText} style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
    );
  }
  if (error || !blog) {
    return (
      <div className={styles.notFound}>
        <h2>{error || 'Blog post not found'}</h2>
        <a href="/blog" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Blog
        </a>
      </div>
    );
  }

  return (
    <div className={styles.blogDetails}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section 
          className={styles.heroSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <a href="/" className={styles.breadcrumbLink}>Home</a>
              <span className={styles.breadcrumbSeparator}>→</span>
              <a href="/blog" className={styles.breadcrumbLink}>Blog</a>
              <span className={styles.breadcrumbSeparator}>→</span>
              <span className={styles.breadcrumbCurrent}>{blog.title}</span>
            </div>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
            <p className={styles.blogSubtitle}>{blog.short_description}</p>
            <div className={styles.blogMeta}>
              <div className={styles.metaItem}>
                <Calendar size={18} />
                <span>{blog.created_at?.split(' ')[0]}</span>
              </div>
              <div className={styles.metaItem}>
                <span>Type: {blog.blog_type}</span>
              </div>
              <div className={styles.metaItem}>
                <span>Sector: {blog.sector_name}</span>
              </div>
              <div className={styles.metaItem}>
                <span>Service: {blog.service_name}</span>
              </div>
            </div>
            <div className={styles.ctaButtons}>
              <a href="/blog" className={styles.secondaryButton}>
                <ArrowLeft size={18} />
                Back to Blog
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            {blog.featured_image && (
              <img 
                src={API_BASE_URL + '/' + blog.featured_image}
                alt={blog.title}
                className={styles.blogImage}
              />
            )}
          </div>
        </motion.section>
        {/* Blog Content */}
        <motion.div 
          className={styles.contentCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>
        {/* Other Blogs Section */}
        {otherBlogs.length > 0 && (
          <div className={styles.otherBlogsSection}>
            <h2>Related Blogs</h2>
            <div className={styles.otherBlogsGrid}>
              {otherBlogs.map(ob => (
                <div key={ob.id} className={styles.otherBlogCard}>
                  <div className={styles.otherBlogImageWrap}>
                    {ob.featured_image && (
                      <img src={API_BASE_URL + '/' + ob.featured_image} alt={ob.title} className={styles.otherBlogImage} />
                    )}
                  </div>
                  <div className={styles.otherBlogContent}>
                    <h3 className={styles.otherBlogTitle}>{ob.title}</h3>
                    <p className={styles.otherBlogDesc}>{ob.short_description}</p>
                    <div className={styles.otherBlogMetaRow}>
                      <span className={styles.otherBlogDate}><Calendar size={16} style={{marginRight:4}} />{ob.created_at?.split(' ')[0]}</span>
                      <a href={`/blog-details/${ob.slug}`} className={styles.otherBlogReadMore}>
                        Read More <ArrowLeft size={16} style={{transform:'rotate(180deg)'}} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
