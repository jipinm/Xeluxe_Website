/**
 * API Service Layer
 * Centralized API communication for the Xeluxe website
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Generic API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  [key: string]: any;
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Settings API Response Types
 */
interface SettingsResponse {
  success: boolean;
  settings: {
    contact: {
      general_enquiry_email: string;
      general_enquiry_person: string;
      managing_partner_email: string;
      managing_partner_person: string;
    };
    footer: {
      footer_copyright_text: string;
      footer_logo_url: string;
      footer_text: string;
    };
    general: {
      date_format: string;
      items_per_page: string;
      site_description: string;
      site_name: string;
      timezone: string;
    };
    home_featured_projects: {
      featured_projects_subtitle: string;
      featured_projects_title: string;
    };
    home_get_in_touch: {
      get_in_touch_subtitle: string;
      get_in_touch_title: string;
    };
    home_hero: {
      hero_video_url: string;
    };
    home_sectors: {
      sectors_subtitle: string;
      sectors_title: string;
    };
    home_what_we_do: {
      what_we_do_subtitle: string;
      what_we_do_title: string;
    };
    home_who_we_are: {
      who_we_are_stat1_heading: string;
      who_we_are_stat1_text: string;
      who_we_are_stat2_heading: string;
      who_we_are_stat2_text: string;
      who_we_are_stat3_heading: string;
      who_we_are_stat3_text: string;
      who_we_are_stat4_heading: string;
      who_we_are_stat4_text: string;
      who_we_are_subtitle: string;
      who_we_are_title: string;
    };
    logo: {
      logo_alt_text: string;
      logo_tagline_1: string;
      logo_tagline_2: string;
      logo_url: string;
    };
    site_identity: {
      favicon_url: string;
    };
    social: {
      social_facebook: string;
      social_instagram: string;
      social_linkedin: string;
      social_twitter: string;
      social_youtube: string;
    };
  };
}

/**
 * Helper function to flatten nested settings object
 */
function parseSettings(settings: SettingsResponse['settings']): Record<string, string> {
  const result: Record<string, string> = {};
  
  Object.values(settings).forEach(group => {
    if (typeof group === 'object' && group !== null) {
      Object.entries(group).forEach(([key, value]) => {
        result[key] = String(value);
      });
    }
  });
  
  return result;
}

/**
 * Settings API
 */
export const settingsApi = {
  /**
   * Get all site settings (returns grouped and parsed formats)
   */
  getSettings: async () => {
    const response = await apiFetch<SettingsResponse>('/public-api/settings.php');
    
    // Return both grouped and flat formats
    return {
      ...response,
      parsed: parseSettings(response.settings),
    };
  },
};

/**
 * About Us API
 */
/**
 * About Us Data Types
 */
export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  description: string;
  photo_path: string;
  view_order: number;
}

export interface ValueItem {
  id: number;
  title: string;
  subtitle: string;
  icon_path: string;
  view_order: number;
}

export interface AboutUsData {
  about_us: {
    page_title: string;
    page_subtitle: string;
    quote_text: string;
    quote_subtext: string;
    about_content: string;
  };
  vision_mission: {
    section_title: string;
    section_subtitle: string;
    vision_content: string;
    mission_content: string;
  };
  leadership: {
    leadership_title: string;
    leadership_subtitle: string;
  };
  values: ValueItem[];
  values_count: number;
  team_members: TeamMember[];
  team_members_count: number;
}

export const aboutUsApi = {
  /**
   * Get About Us page content (all data in one call)
   */
  getAboutUs: () =>
    apiFetch<{
      success: boolean;
      data: AboutUsData;
    }>('/public-api/about-us.php'),
};

/**
 * Service Menu Types (for Header Navigation)
 */
export interface ServiceMenuItem {
  id: number;
  category_id: number;
  title: string;
  slug: string;
}

export interface ServiceCategory {
  id: number;
  category_name: string;
  slug: string;
  featured_image: string;
  short_description: string;
  services: ServiceMenuItem[];
}

export interface ServiceCategoriesResponse {
  success: boolean;
  data: ServiceCategory[];
  count: number;
}

/**
 * Service Categories List Types (for Home Page)
 */
export interface ServiceCategoryListItem {
  id: number;
  category_name: string;
  slug: string;
  short_description: string;
  featured_image: string;
  services_count: number;
  first_service_slug?: string;
}

export interface ServiceCategoriesListResponse {
  success: boolean;
  data: ServiceCategoryListItem[];
  count: number;
}

/**
 * Services API
 */
/**
 * Related Service Interface
 */
export interface RelatedService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  display_order: number;
}

/**
 * Service Detail Interface
 */
export interface ServiceDetail {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  featured_image: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  canonical_url: string;
  robots_index: boolean;
  robots_follow: boolean;
  category_name: string;
  category_slug: string;
}

export const servicesApi = {
  /**
   * Get service categories with nested services for menu
   */
  getServiceCategories: () =>
    apiFetch<ServiceCategoriesResponse>('/public-api/service-categories.php'),

  /**
   * Get service categories list for home page
   */
  getServiceCategoriesList: () =>
    apiFetch<ServiceCategoriesListResponse>('/public-api/service-categories-list.php'),

  /**
   * Get service detail by slug
   */
  getServiceBySlug: (slug: string) =>
    apiFetch<{
      success: boolean;
      data: {
        service: ServiceDetail;
        related_services: RelatedService[];
        related_count: number;
      };
    }>(`/public-api/service.php?slug=${slug}`),

  /**
   * Get service categories
   */
  getCategories: () =>
    apiFetch<{
      success: boolean;
      categories: Array<{
        id: number;
        category_name: string;
        slug: string;
        icon_class: string;
        short_description: string;
        banner_image: string;
        display_order: number;
        status: string;
      }>;
    }>('/api/services.php?action=list_categories'),

  /**
   * Get all services or filter by category
   */
  getServices: (categoryId?: number) =>
    apiFetch<{
      success: boolean;
      services: Array<{
        id: number;
        category_id: number;
        category_name: string;
        service_title: string;
        slug: string;
        short_description: string;
        full_description: string;
        hero_image: string;
        thumbnail_image: string;
        gallery_images: string;
        icon_class: string;
        key_features: string;
        benefits: string;
        process: string;
        compliance_standards: string;
        related_sectors: string;
        faqs: string;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        display_order: number;
        status: string;
      }>;
    }>(`/api/services.php?action=list${categoryId ? `&category_id=${categoryId}` : ''}`),

  /**
   * Get single service by ID
   */
  getServiceById: (id: number) =>
    apiFetch<{
      success: boolean;
      service: {
        id: number;
        category_id: number;
        category_name: string;
        service_title: string;
        slug: string;
        short_description: string;
        full_description: string;
        hero_image: string;
        thumbnail_image: string;
        gallery_images: string;
        icon_class: string;
        key_features: string;
        benefits: string;
        process: string;
        compliance_standards: string;
        related_sectors: string;
        faqs: string;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        display_order: number;
        status: string;
      };
    }>(`/api/services.php?action=get&id=${id}`),

};

/**
 * Project Menu Types (for Header Navigation)
 */
export interface ProjectMenuItem {
  id: number;
  category_id: number;
  title: string;
  slug: string;
}

export interface ProjectCategory {
  id: number;
  category_name: string;
  slug: string;
  projects: ProjectMenuItem[];
}

export interface ProjectCategoriesResponse {
  success: boolean;
  data: ProjectCategory[];
  count: number;
}

/**
 * Featured Projects Types (for Home Page)
 */
export interface FeaturedProjectItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  location: string;
  category_name: string;
}

export interface FeaturedProjectsResponse {
  success: boolean;
  data: FeaturedProjectItem[];
  count: number;
}

/**
 * Featured Sectors Types (for Home Page)
 */
export interface FeaturedSectorItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  location: string;
  category_name: string;
  category_slug: string;
}

export interface FeaturedSectorsResponse {
  success: boolean;
  data: FeaturedSectorItem[];
  count: number;
}

/**
 * Project Detail Types
 */
export interface RelatedProject {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  location: string;
  featured_image: string;
  view_order: number;
  is_featured: boolean;
}

export interface ProjectDetail {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  short_description: string;
  location: string;
  featured_image: string;
  content: string;
  gallery_images: string[];
  view_order: number;
  is_featured: boolean;
  is_active: boolean;
  seo_title: string;
  meta_description: string;
  meta_robots: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  schema_type: string;
  schema_data: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_slug: string;
}

export interface ProjectDetailResponse {
  success: boolean;
  data: {
    project: ProjectDetail;
    related_projects: RelatedProject[];
    related_count: number;
  };
}

/**
 * Projects API
 */
export const projectsApi = {
  /**
   * Get project categories with nested projects for menu
   */
  getProjectCategories: () =>
    apiFetch<ProjectCategoriesResponse>('/public-api/project-categories.php'),

  /**
   * Get featured projects for home page
   */
  getFeaturedProjects: () =>
    apiFetch<FeaturedProjectsResponse>('/public-api/featured-projects.php'),

  /**
   * Get featured sectors for home page
   */
  getFeaturedSectors: () =>
    apiFetch<FeaturedSectorsResponse>('/public-api/featured-sectors.php'),

  /**
   * Get project categories
   */
  getCategories: () =>
    apiFetch<{
      success: boolean;
      categories: Array<{
        id: number;
        category_name: string;
        slug: string;
        description: string;
        icon_class: string;
        display_order: number;
        is_active: number;
      }>;
    }>('/api/projects.php?action=list_categories'),

  /**
   * Get all projects or filter by category
   */
  getProjects: (categoryId?: number) =>
    apiFetch<{
      success: boolean;
      projects: Array<{
        id: number;
        category_id: number;
        category_name: string;
        project_title: string;
        slug: string;
        location: string;
        client_name: string;
        project_date: string;
        short_description: string;
        full_description: string;
        thumbnail_image: string;
        featured_image: string;
        gallery_images: string;
        project_size: string;
        project_value: string;
        key_features: string;
        challenges: string;
        solutions: string;
        technologies: string;
        awards: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        display_order: number;
        status: string;
      }>;
    }>(`/api/projects.php?action=list${categoryId ? `&category_id=${categoryId}` : ''}`),

  /**
   * Get single project by ID
   */
  getProjectById: (id: number) =>
    apiFetch<{
      success: boolean;
      project: {
        id: number;
        category_id: number;
        category_name: string;
        project_title: string;
        slug: string;
        location: string;
        client_name: string;
        project_date: string;
        short_description: string;
        full_description: string;
        thumbnail_image: string;
        featured_image: string;
        gallery_images: string;
        project_size: string;
        project_value: string;
        key_features: string;
        challenges: string;
        solutions: string;
        technologies: string;
        awards: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        display_order: number;
        status: string;
      };
    }>(`/api/projects.php?action=get&id=${id}`),

  /**
   * Get single project by slug
   */
  getProjectBySlug: (slug: string) =>
    apiFetch<ProjectDetailResponse>(`/public-api/project.php?slug=${slug}`),

  /**
   * Get sector details by slug
   */
  getSectorBySlug: (slug: string) =>
    apiFetch<{
      success: boolean;
      data: {
        sector: {
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
        };
        featured_projects: Array<{
          id: number;
          title: string;
          slug: string;
          short_description: string;
          location: string;
          featured_image: string;
          gallery_images: string[];
          view_order: number;
          is_featured: boolean;
          is_active: boolean;
          seo_title: string;
          meta_description: string;
          og_image: string;
          created_at: string;
          updated_at: string;
        }>;
        projects_count: number;
      };
    }>(`/public-api/sector.php?slug=${slug}`),

  /**
   * Get all projects by category slug
   */
  getProjectsByCategory: (categorySlug: string) =>
    apiFetch<{
      success: boolean;
      projects: Array<{
        id: number;
        category_id: number;
        title: string;
        slug: string;
        short_description: string;
        location: string;
        featured_image: string;
        content: string;
        gallery_images: string;
        view_order: number;
        is_featured: number;
        is_active: number;
        seo_title: string | null;
        meta_description: string | null;
        og_image: string | null;
        created_at: string;
        updated_at: string;
        category_name: string;
        category_slug: string;
      }>;
    }>(`/public-api/projects.php?action=by-category&category=${categorySlug}`),
};

/**
 * Blog API
 */
export interface BlogPost {
  id: number;
  sector_id: number | null;
  service_id: number | null;
  blog_type: string;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  is_active: boolean;
  view_order: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  created_at: string;
  updated_at: string;
  sector_name: string | null;
  sector_slug: string | null;
  service_name: string | null;
  service_slug: string | null;
}

export interface BlogsResponse {
  success: boolean;
  data: BlogPost[];
  pagination: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface BlogFilters {
  type?: string;
  sector_id?: number;
  service_id?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const blogApi = {
  /**
   * Get blogs with filters from public API
   */
  getBlogs: (filters?: BlogFilters) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.sector_id) params.append('sector_id', filters.sector_id.toString());
    if (filters?.service_id) params.append('service_id', filters.service_id.toString());
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    return apiFetch<BlogsResponse>(`/public-api/blogs.php${queryString ? '?' + queryString : ''}`);
  },

  /**
   * Get blog settings
   */
  getSettings: () =>
    apiFetch<{
      success: boolean;
      settings: {
        page_title: string;
        page_subtitle: string;
        featured_section_title: string;
        posts_per_page: number;
      };
    }>('/api/blog.php?action=get_settings'),

  /**
   * Get all blog posts with pagination
   */
  getPosts: (page: number = 1, limit: number = 9) =>
    apiFetch<{
      success: boolean;
      posts: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        author_name: string;
        author_designation: string;
        author_image: string;
        published_date: string;
        read_time: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        status: string;
      }>;
      pagination: {
        current_page: number;
        total_pages: number;
        total_posts: number;
        per_page: number;
      };
    }>(`/api/blog.php?action=list&page=${page}&limit=${limit}`),

  /**
   * Get featured blog posts
   */
  getFeaturedPosts: () =>
    apiFetch<{
      success: boolean;
      posts: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        author_name: string;
        author_designation: string;
        author_image: string;
        published_date: string;
        read_time: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        status: string;
      }>;
    }>('/api/blog.php?action=list_featured'),

  /**
   * Get single blog post by ID
   */
  getPostById: (id: number) =>
    apiFetch<{
      success: boolean;
      post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        author_name: string;
        author_designation: string;
        author_image: string;
        published_date: string;
        read_time: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        status: string;
      };
    }>(`/api/blog.php?action=get&id=${id}`),

  /**
   * Get single blog post by slug
   */
  getPostBySlug: (slug: string) =>
    apiFetch<{
      success: boolean;
      post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        featured_image: string;
        author_name: string;
        author_designation: string;
        author_image: string;
        published_date: string;
        read_time: string;
        is_featured: number;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        status: string;
      };
    }>(`/api/blog.php?action=get_by_slug&slug=${slug}`),
};

/**
 * Careers API
 */
export const careersApi = {
  /**
   * Get careers page settings
   */
  getSettings: () =>
    apiFetch<{
      success: boolean;
      settings: {
        page_title: string;
        page_subtitle: string;
        why_work_title: string;
        why_work_content: string;
        benefits_title: string;
        benefits_list: string;
        application_email: string;
      };
    }>('/api/careers.php?action=get_settings'),

  /**
   * Get all job postings with filters
   */
  getJobs: (params?: {
    department_id?: number;
    location_id?: number;
    experience_level_id?: number;
  }) => {
    const queryParams = new URLSearchParams();
    queryParams.append('action', 'list');
    if (params?.department_id) queryParams.append('department_id', params.department_id.toString());
    if (params?.location_id) queryParams.append('location_id', params.location_id.toString());
    if (params?.experience_level_id) queryParams.append('experience_level_id', params.experience_level_id.toString());
    
    return apiFetch<{
      success: boolean;
      jobs: Array<{
        id: number;
        job_title: string;
        slug: string;
        department_name: string;
        location_name: string;
        experience_level: string;
        salary_range: string;
        job_type: string;
        short_description: string;
        full_description: string;
        requirements: string;
        responsibilities: string;
        qualifications: string;
        benefits: string;
        application_deadline: string;
        posted_date: string;
        status: string;
      }>;
    }>(`/api/careers.php?${queryParams.toString()}`);
  },

  /**
   * Get single job by ID
   */
  getJobById: (id: number) =>
    apiFetch<{
      success: boolean;
      job: {
        id: number;
        job_title: string;
        slug: string;
        department_id: number;
        department_name: string;
        location_id: number;
        location_name: string;
        experience_level_id: number;
        experience_level: string;
        salary_range_id: number;
        salary_range: string;
        job_type: string;
        short_description: string;
        full_description: string;
        requirements: string;
        responsibilities: string;
        qualifications: string;
        benefits: string;
        application_deadline: string;
        posted_date: string;
        status: string;
      };
    }>(`/api/careers.php?action=get&id=${id}`),

  /**
   * Get single job by slug
   */
  getJobBySlug: (slug: string) =>
    apiFetch<{
      success: boolean;
      job: {
        id: number;
        job_title: string;
        slug: string;
        department_id: number;
        department_name: string;
        location_id: number;
        location_name: string;
        experience_level_id: number;
        experience_level: string;
        salary_range_id: number;
        salary_range: string;
        job_type: string;
        short_description: string;
        full_description: string;
        requirements: string;
        responsibilities: string;
        qualifications: string;
        benefits: string;
        application_deadline: string;
        posted_date: string;
        status: string;
      };
    }>(`/api/careers.php?action=get_by_slug&slug=${slug}`),

  /**
   * Get departments
   */
  getDepartments: () =>
    apiFetch<{
      success: boolean;
      departments: Array<{
        id: number;
        department_name: string;
        description: string;
        is_active: number;
      }>;
    }>('/api/careers.php?action=list_departments'),

  /**
   * Get locations
   */
  getLocations: () =>
    apiFetch<{
      success: boolean;
      locations: Array<{
        id: number;
        location_name: string;
        country: string;
        is_active: number;
      }>;
    }>('/api/careers.php?action=list_locations'),

  /**
   * Submit job application
   */
  submitApplication: (formData: FormData) =>
    fetch(`${API_BASE_URL}/api/careers.php?action=apply`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json()),
};

/**
 * Clients API
 */
/**
 * Client Item Interface
 */
export interface ClientItem {
  id: number;
  client_image: string;
  client_name: string;
}

/**
 * Clients API Response Interface
 */
export interface ClientsResponse {
  success: boolean;
  settings: {
    page_title: string;
    page_subtitle: string;
  };
  clients: ClientItem[];
  count: number;
}

export const clientsApi = {
  /**
   * Get clients with settings
   */
  getClients: () =>
    apiFetch<ClientsResponse>('/public-api/clients.php'),
};

/**
 * Recognition Item Interface
 */
export interface RecognitionItem {
  id: number;
  certificate_image: string;
  recognition_title: string;
  organization_name: string;
}

/**
 * Recognitions API Response Interface
 */
export interface RecognitionsResponse {
  success: boolean;
  settings: {
    page_title: string;
    page_subtitle: string;
  };
  recognitions: RecognitionItem[];
  count: number;
}

/**
 * Recognitions API
 */
export const recognitionsApi = {
  /**
   * Get recognitions with settings
   */
  getRecognitions: () =>
    apiFetch<RecognitionsResponse>('/public-api/recognitions.php'),
};

/**
 * Contact Form API
 */
export const contactApi = {
  /**
   * Submit contact form
   */
  submitContactForm: (data: {
    full_name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) =>
    fetch(`${API_BASE_URL}/api/contact.php?action=submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  /**
   * Get office addresses
   */
  getAddresses: () =>
    apiFetch<{
      success: boolean;
      addresses: Array<{
        id: number;
        office_name: string;
        address_line1: string;
        address_line2: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
        phone: string;
        email: string;
        map_embed_code: string;
        latitude: string;
        longitude: string;
        display_order: number;
        is_active: number;
      }>;
    }>('/api/contact.php?action=get_addresses'),
};

/**
 * SEO Data Interface
 */
export interface SeoData {
  id: number;
  page_identifier: string;
  page_name: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string | null;
  twitter_card: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  schema_type: string | null;
  schema_data: string | null;
  hreflang_tags: string | null;
  custom_head_tags: string | null;
}

/**
 * SEO API
 */
export const seoApi = {
  /**
   * Get SEO data for a specific page by identifier
   */
  getPageSeo: (pageIdentifier: string) =>
    apiFetch<{
      success: boolean;
      data: SeoData;
    }>(`/public-api/seo-data.php?page_identifier=${pageIdentifier}`),
};

// Export all APIs as a single object
// --- Careers Types & Fetchers for Public Use ---
export interface PublicCareer {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  employment_type: string;
  status: string;
  view_order: number;
  created_at: string;
  updated_at: string;
  department: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  experience_level: {
    id: number;
    name: string;
  };
  salary_range: {
    id: number;
    name: string;
  };
}

export interface PublicCareersResponse {
  data: PublicCareer[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface PublicDepartment {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PublicLocation {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PublicExperienceLevel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export async function fetchPublicCareers(params?: {
  department_id?: number;
  location_id?: number;
  experience_level_id?: number;
  page?: number;
  limit?: number;
}): Promise<PublicCareersResponse> {
  const queryParams = new URLSearchParams();
  if (params?.department_id) queryParams.append('department_id', params.department_id.toString());
  if (params?.location_id) queryParams.append('location_id', params.location_id.toString());
  if (params?.experience_level_id) queryParams.append('experience_level_id', params.experience_level_id.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  const endpoint = queryParams.toString() ? `/public-api/careers.php?${queryParams.toString()}` : '/public-api/careers.php';
  const response = await apiFetch<{ success: boolean; data: PublicCareer[]; pagination: PublicCareersResponse['pagination']; }>(endpoint);
  return { data: response.data, pagination: response.pagination };
}

export async function fetchPublicDepartments(): Promise<PublicDepartment[]> {
  const response = await apiFetch<{ success: boolean; data: PublicDepartment[]; count: number; }>('/public-api/departments.php');
  return response.data;
}

export async function fetchPublicLocations(): Promise<PublicLocation[]> {
  const response = await apiFetch<{ success: boolean; data: PublicLocation[]; count: number; }>('/public-api/locations.php');
  return response.data;
}

export async function fetchPublicExperienceLevels(): Promise<PublicExperienceLevel[]> {
  const response = await apiFetch<{ success: boolean; data: PublicExperienceLevel[]; count: number; }>('/public-api/experience-levels.php');
  return response.data;
}
export const api = {
  settings: settingsApi,
  aboutUs: aboutUsApi,
  services: servicesApi,
  projects: projectsApi,
  blog: blogApi,
  careers: careersApi,
  clients: clientsApi,
  recognitions: recognitionsApi,
  contact: contactApi,
  seo: seoApi,
};

export default api;
