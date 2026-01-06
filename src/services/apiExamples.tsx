/**
 * API Usage Examples
 * 
 * This file demonstrates how to use the API service layer and custom hooks
 * throughout the application.
 * 
 * NOTE: This is an example/reference file. The code here is meant to be copied
 * into your actual components, not imported directly. TypeScript errors in this
 * file are expected and can be ignored.
 * 
 * @fileoverview Example code showing various API integration patterns
 */

// @ts-nocheck - This is an example file with intentional duplicate code for demonstration

// ============================================================================
// Example 1: Basic API call with useApi hook
// ============================================================================

import { useApi } from '../hooks/useApi';
import api from '../services/api';

function ServicesPage() {
  const { data, loading, error, refetch } = useApi(
    () => api.services.getServices(),
    [] // Dependencies - empty array means call once on mount
  );

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.services.map((service) => (
        <div key={service.id}>
          <h3>{service.service_title}</h3>
          <p>{service.short_description}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Example 2: API call with parameters using useLazyApi
// ============================================================================

import { useLazyApi } from '../hooks/useApi';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error, execute } = useLazyApi(
    (serviceSlug: string) => api.services.getServiceBySlug(serviceSlug)
  );

  useEffect(() => {
    if (slug) {
      execute(slug);
    }
  }, [slug, execute]);

  if (loading) return <div>Loading service details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Service not found</div>;

  const { service } = data;

  return (
    <div>
      <h1>{service.service_title}</h1>
      <div dangerouslySetInnerHTML={{ __html: service.full_description }} />
      
      {/* Gallery Images */}
      {service.gallery_images && (
        <div className="gallery">
          {service.gallery_images.split(',').map((img, idx) => (
            <img key={idx} src={img} alt={`${service.service_title} - ${idx + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 3: Form submission with useApiSubmit
// ============================================================================

import { useApiSubmit } from '../hooks/useApi';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const { loading, error, success, submit, reset } = useApiSubmit(
    (data: typeof formData) => api.contact.submitContactForm(data)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>Message Sent Successfully!</h3>
        <button onClick={() => {
          reset();
          setFormData({
            full_name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: '',
          });
        }}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
      />
      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
      />
      
      {error && <div className="error-message">{error.message}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

// ============================================================================
// Example 4: Multiple API calls in one component
// ============================================================================

function HomePage() {
  const { data: settings, loading: settingsLoading } = useApi(
    () => api.settings.getSettings(),
    []
  );

  const { data: featuredProjects, loading: projectsLoading } = useApi(
    () => api.projects.getFeaturedProjects(),
    []
  );

  const { data: services, loading: servicesLoading } = useApi(
    () => api.services.getServices(),
    []
  );

  const loading = settingsLoading || projectsLoading || servicesLoading;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      {settings && (
        <section className="hero">
          <h1>{settings.settings.logo_tagline_1}</h1>
          <h2>{settings.settings.logo_tagline_2}</h2>
          <video src={settings.settings.hero_video_url} autoPlay loop muted />
        </section>
      )}

      {/* Services Section */}
      {services && (
        <section className="services">
          <h2>{settings?.settings.what_we_do_title}</h2>
          <p>{settings?.settings.what_we_do_subtitle}</p>
          <div className="service-grid">
            {services.services.slice(0, 6).map((service) => (
              <div key={service.id} className="service-card">
                <img src={service.thumbnail_image} alt={service.service_title} />
                <h3>{service.service_title}</h3>
                <p>{service.short_description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects && (
        <section className="projects">
          <h2>{settings?.settings.featured_projects_title}</h2>
          <p>{settings?.settings.featured_projects_subtitle}</p>
          <div className="project-grid">
            {featuredProjects.projects.map((project) => (
              <div key={project.id} className="project-card">
                <img src={project.thumbnail_image} alt={project.project_title} />
                <h3>{project.project_title}</h3>
                <p>{project.location}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// Example 5: Direct API usage without hooks (for utility functions)
// ============================================================================

async function generateSitemap() {
  try {
    // Get all services
    const servicesResponse = await api.services.getServices();
    const services = servicesResponse.services;

    // Get all projects
    const projectsResponse = await api.projects.getProjects();
    const projects = projectsResponse.projects;

    // Get all blog posts
    const blogResponse = await api.blog.getPosts(1, 100);
    const posts = blogResponse.posts;

    // Generate sitemap URLs
    const serviceUrls = services.map(s => `/services/${s.slug}`);
    const projectUrls = projects.map(p => `/projects/${p.slug}`);
    const blogUrls = posts.map(b => `/blog/${b.slug}`);

    return [...serviceUrls, ...projectUrls, ...blogUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}

// ============================================================================
// Example 6: Filtered API calls
// ============================================================================

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  
  const { data: categories } = useApi(
    () => api.projects.getCategories(),
    []
  );

  const { data: projects, loading, execute } = useLazyApi(
    (categoryId?: number) => api.projects.getProjects(categoryId)
  );

  useEffect(() => {
    execute(selectedCategory);
  }, [selectedCategory, execute]);

  return (
    <div>
      <div className="filters">
        <button onClick={() => setSelectedCategory(undefined)}>All</button>
        {categories?.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={selectedCategory === cat.id ? 'active' : ''}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {loading && <div>Loading projects...</div>}
      
      {projects && (
        <div className="project-grid">
          {projects.projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.thumbnail_image} alt={project.project_title} />
              <h3>{project.project_title}</h3>
              <p>{project.location}</p>
              <span className="category">{project.category_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 7: Blog with pagination
// ============================================================================

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, loading } = useApi(
    () => api.blog.getPosts(currentPage, 9),
    [currentPage] // Refetch when page changes
  );

  if (loading) return <div>Loading blog posts...</div>;
  if (!data) return <div>No posts found</div>;

  const { posts, pagination } = data;

  return (
    <div>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card">
            <img src={post.featured_image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="meta">
              <span>{post.author_name}</span>
              <span>{post.published_date}</span>
              <span>{post.read_time}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span>
          Page {pagination.current_page} of {pagination.total_pages}
        </span>
        
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === pagination.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Example 8: SEO metadata usage
// ============================================================================

import { useEffect } from 'react';

function usePageSeo(pageSlug: string) {
  const { data } = useApi(
    () => api.seo.getPageSeo(pageSlug),
    [pageSlug]
  );

  useEffect(() => {
    if (data?.seo) {
      const { meta_title, meta_description, meta_keywords, og_title, og_description, og_image } = data.seo;
      
      // Update document title
      document.title = meta_title;
      
      // Update meta tags
      updateMetaTag('description', meta_description);
      updateMetaTag('keywords', meta_keywords);
      
      // Update Open Graph tags
      updateMetaTag('og:title', og_title, 'property');
      updateMetaTag('og:description', og_description, 'property');
      updateMetaTag('og:image', og_image, 'property');
    }
  }, [data]);
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

// Usage in a page component
function AboutUsPage() {
  usePageSeo('about-us');
  
  const { data, loading } = useApi(() => api.aboutUs.getAboutUs(), []);
  
  // ... rest of component
}

// ============================================================================
// Example 9: Career application with file upload
// ============================================================================

function JobApplicationForm({ jobId }: { jobId: number }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
  });
  const [resume, setResume] = useState<File | null>(null);

  const { loading, error, success, submit } = useApiSubmit(
    (data: FormData) => api.careers.submitApplication(data)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('job_id', jobId.toString());
    submitData.append('full_name', formData.full_name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('cover_letter', formData.cover_letter);
    
    if (resume) {
      submitData.append('resume', resume);
    }
    
    await submit(submitData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        required
      />
      
      {error && <div className="error">{error.message}</div>}
      {success && <div className="success">Application submitted!</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}

// ============================================================================
// Example 10: Global settings context
// ============================================================================

import { createContext, useContext, ReactNode } from 'react';

interface SettingsContextType {
  settings: any;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { data, loading } = useApi(() => api.settings.getSettings(), []);

  return (
    <SettingsContext.Provider value={{ settings: data?.settings || null, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

// Usage in App.tsx
function App() {
  return (
    <SettingsProvider>
      <Router>
        {/* Your routes */}
      </Router>
    </SettingsProvider>
  );
}

// Usage in any component
function Header() {
  const { settings, loading } = useSettings();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <header>
      <img src={settings?.logo_url} alt={settings?.logo_alt_text} />
      <p>{settings?.logo_tagline_1}</p>
    </header>
  );
}

export {
  ServicesPage,
  ServiceDetailsPage,
  ContactForm,
  HomePage,
  ProjectsPage,
  BlogPage,
  AboutUsPage,
  JobApplicationForm,
};
