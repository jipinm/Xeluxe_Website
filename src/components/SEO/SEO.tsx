import { useEffect } from 'react';
import type { SeoData } from '../../services/api';

interface SEOProps {
  seoData: Partial<SeoData> | SeoData | null;
  defaultTitle?: string;
  defaultDescription?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  seoData, 
  defaultTitle = 'Xeluxe Fire Safety Consultants',
  defaultDescription = 'Professional fire safety consultancy services'
}) => {
  useEffect(() => {
    if (!seoData) return;

    // Update document title
    const title = seoData.meta_title || defaultTitle;
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (
      selector: string, 
      content: string | null | undefined, 
      attribute: string = 'name'
    ) => {
      if (!content) return;
      
      let element = document.querySelector(`meta[${attribute}="${selector}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string | null | undefined) => {
      if (!href) return;
      
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Update basic meta tags
    updateMetaTag('description', seoData.meta_description || defaultDescription);
    if (seoData.meta_keywords) {
      updateMetaTag('keywords', seoData.meta_keywords);
    }

    // Update robots meta tag
    const robotsContent = `${seoData.robots_index ? 'index' : 'noindex'}, ${seoData.robots_follow ? 'follow' : 'nofollow'}`;
    updateMetaTag('robots', robotsContent);

    // Update canonical URL
    if (seoData.canonical_url) {
      updateLinkTag('canonical', seoData.canonical_url);
    }

    // Update Open Graph meta tags
    updateMetaTag('og:title', seoData.og_title || seoData.meta_title || title, 'property');
    updateMetaTag('og:description', seoData.og_description || seoData.meta_description || defaultDescription, 'property');
    if (seoData.og_image) {
      updateMetaTag('og:image', seoData.og_image, 'property');
    }
    if (seoData.og_type) {
      updateMetaTag('og:type', seoData.og_type, 'property');
    }
    updateMetaTag('og:url', seoData.canonical_url || window.location.href, 'property');

    // Update Twitter Card meta tags
    if (seoData.twitter_card) {
      updateMetaTag('twitter:card', seoData.twitter_card);
    }
    updateMetaTag('twitter:title', seoData.twitter_title || seoData.og_title || seoData.meta_title || title);
    updateMetaTag('twitter:description', seoData.twitter_description || seoData.og_description || seoData.meta_description || defaultDescription);
    if (seoData.twitter_image || seoData.og_image) {
      updateMetaTag('twitter:image', seoData.twitter_image || seoData.og_image);
    }

    // Handle schema.org structured data
    if (seoData.schema_data) {
      let schemaElement = document.querySelector('script[type="application/ld+json"]');
      if (!schemaElement) {
        schemaElement = document.createElement('script');
        schemaElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaElement);
      }
      try {
        // Validate and parse JSON
        const schemaJson = JSON.parse(seoData.schema_data);
        schemaElement.textContent = JSON.stringify(schemaJson);
      } catch (error) {
        console.error('Invalid schema data:', error);
      }
    }

    // Handle custom head tags
    if (seoData.custom_head_tags) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = seoData.custom_head_tags;
      const customElements = tempDiv.children;
      
      for (let i = 0; i < customElements.length; i++) {
        const element = customElements[i].cloneNode(true) as HTMLElement;
        element.setAttribute('data-custom-seo', 'true');
        document.head.appendChild(element);
      }
    }

    // Handle hreflang tags
    if (seoData.hreflang_tags) {
      try {
        const hreflangData = JSON.parse(seoData.hreflang_tags);
        if (Array.isArray(hreflangData)) {
          hreflangData.forEach((item: { lang: string; url: string }) => {
            let element = document.querySelector(`link[hreflang="${item.lang}"]`) as HTMLLinkElement;
            if (!element) {
              element = document.createElement('link');
              element.setAttribute('rel', 'alternate');
              element.setAttribute('hreflang', item.lang);
              document.head.appendChild(element);
            }
            element.href = item.url;
          });
        }
      } catch (error) {
        console.error('Invalid hreflang data:', error);
      }
    }

    // Cleanup function
    return () => {
      // Remove custom head tags on unmount
      const customElements = document.querySelectorAll('[data-custom-seo="true"]');
      customElements.forEach(element => element.remove());
    };
  }, [seoData, defaultTitle, defaultDescription]);

  return null; // This component doesn't render anything
};

export default SEO;
