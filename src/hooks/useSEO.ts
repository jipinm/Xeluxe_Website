import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoApi } from '../services/api';
import type { SeoData } from '../services/api';

/**
 * Custom hook to fetch and manage SEO data based on current route
 */
export const useSEO = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Map route paths to page identifiers for the SEO API
   * The page_identifier should match the URL path after domain
   */
  const getPageIdentifier = (pathname: string): string => {
    // Remove leading slash but keep the rest of the path structure
    const path = pathname.replace(/^\//, '');

    // Home page - empty path becomes 'home'
    if (!path || path === '') return 'home';

    // For all other pages, return the exact path structure
    // Examples:
    // /about-us -> about-us
    // /service/master-planning-fire-life-safety -> service/master-planning-fire-life-safety
    // /project/education -> project/education
    // /blog-details/my-new-blog -> blog-details/my-new-blog
    // /career-details/new-career-opportunity -> career-details/new-career-opportunity
    
    return path;
  };

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const pageIdentifier = getPageIdentifier(location.pathname);
        const response = await seoApi.getPageSeo(pageIdentifier);
        
        if (response.success && response.data) {
          setSeoData(response.data);
        } else {
          throw new Error('Failed to fetch SEO data');
        }
      } catch (err) {
        console.error('SEO data fetch error:', err);
        setError(err as Error);
        // Set null to allow fallback to defaults
        setSeoData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSeoData();
  }, [location.pathname]);

  return { seoData, loading, error };
};
