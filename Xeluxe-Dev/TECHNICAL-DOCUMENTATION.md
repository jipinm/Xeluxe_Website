# Xeluxe Website - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [API Integration](#api-integration)
7. [State Management](#state-management)
8. [Routing & Navigation](#routing--navigation)
9. [Styling Architecture](#styling-architecture)
10. [Build & Deployment](#build--deployment)
11. [Development Guidelines](#development-guidelines)
12. [Performance Optimizations](#performance-optimizations)

---

## Project Overview

**Project Name:** Xeluxe Website  
**Description:** A professional corporate website for Xeluxe, a fire and life safety engineering consultancy firm specializing in complex, high-performance environments.

**Purpose:** Showcase services, projects, sectors, blog content, and career opportunities while providing comprehensive information about the company's expertise and values.

---

## Technology Stack

### Frontend Framework
- **React 18.2.0** - Modern UI library with Hooks and Concurrent Features
- **TypeScript 5.8.3** - Static type checking for enhanced code quality
- **Vite 7.0.4** - Next-generation frontend build tool for fast development

### UI & Animation Libraries
- **Framer Motion 12.23.12** - Production-ready animation library
  - Used for page transitions, scroll animations, and interactive elements
- **GSAP 3.13.0** - Professional-grade animation library
  - Used for complex scroll-triggered animations
- **Lottie React 2.4.1** - Render After Effects animations
- **Lucide React 0.525.0** - Icon library with 1000+ consistent icons

### Routing
- **React Router DOM 7.8.0** - Client-side routing with nested routes
  - Configured with full page reloads for consistent scroll-to-top behavior

### Styling
- **CSS Modules** - Scoped styling to prevent naming conflicts
- **Tailwind CSS** - Utility-first CSS framework (configured via tailwind.config.ts)

### Development Tools
- **ESLint 9.30.1** - Code linting and quality enforcement
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting rules

---

## Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│                    React Application                         │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │   Contexts     │  │   Components   │  │    Pages     │ │
│  │                │  │                │  │              │ │
│  │ - Settings     │  │ - Header       │  │ - Home       │ │
│  │ - ServiceMenu  │  │ - Footer       │  │ - Services   │ │
│  │ - ProjectMenu  │  │ - Hero         │  │ - Projects   │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Service Layer                        │  │
│  │  - servicesApi                                        │  │
│  │  - projectsApi                                        │  │
│  │  - blogApi                                            │  │
│  │  - settingsApi                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
└──────────────────────────┼──────────────────────────────────┘
                           ↓
                  ┌────────────────┐
                  │  Backend API   │
                  │   (PHP/MySQL)  │
                  └────────────────┘
```

### Component Hierarchy

```
App.tsx (Root Layout)
├── ScrollRestoration (Scroll Management)
├── Header / InternalHeader (Navigation)
├── Routes
│   ├── HomePage
│   │   ├── Hero
│   │   ├── WhoWeAre
│   │   ├── Services
│   │   ├── Sectors
│   │   ├── Projects
│   │   └── ContactForm
│   ├── AboutUs
│   │   ├── InternalHeader
│   │   ├── WhoWeAreSection
│   │   ├── VisionMissionValues
│   │   └── Leadership
│   ├── Services
│   │   └── ServiceDetailsPage
│   ├── Projects
│   │   └── ProjectDetailsPage
│   ├── Sectors
│   │   ├── IndustrySectors
│   │   └── SectorPage
│   ├── Blog
│   │   └── BlogDetailsPage
│   └── Careers
│       └── CareerDetailsPage
└── Footer
```

---

## Project Structure

```
xeluxe/
├── public/                      # Static assets
│   └── images/                  # Image assets organized by category
│       ├── certificates/
│       ├── clients/
│       ├── projects/
│       └── team/
│
├── src/
│   ├── assets/                  # Application assets (fonts, icons, etc.)
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Blog/
│   │   ├── BlogDetails/
│   │   ├── Careers/
│   │   ├── CareerDetails/
│   │   ├── Certifications/
│   │   ├── Clients/
│   │   ├── ContactForm/
│   │   ├── ContactUs/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── IndustrySectors/
│   │   ├── InternalHeader/
│   │   ├── Leadership/
│   │   ├── OurProjects/
│   │   ├── OurServices/
│   │   ├── PageLoader/
│   │   ├── Projects/
│   │   ├── ProjectDetails/
│   │   ├── Sectors/
│   │   ├── Services/
│   │   ├── ServiceDetails/
│   │   ├── ScrollToTop/         # Floating scroll-to-top button
│   │   ├── SEO/                 # SEO meta tags component
│   │   ├── shared/              # Shared sub-components
│   │   ├── VisionMissionValuesSection/
│   │   ├── WhoWeAre/
│   │   └── WhoWeAreSection/
│   │
│   ├── contexts/                # React Context providers
│   │   ├── SettingsContext.tsx  # Global settings management
│   │   ├── ServiceMenuContext.tsx # Service menu state
│   │   └── ProjectMenuContext.tsx # Project menu state
│   │
│   ├── data/                    # Static data files
│   │   ├── blogData.ts
│   │   ├── projectsData.ts
│   │   ├── sectorsData.ts
│   │   └── servicesData.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useSEO.ts            # SEO data fetching hook
│   │
│   ├── pages/                   # Page-level components
│   │   ├── AboutUs.tsx
│   │   ├── BlogDetails.tsx
│   │   ├── BlogDetailsPage.tsx
│   │   ├── Blogs.tsx
│   │   ├── CareerDetails.tsx
│   │   ├── Careers.tsx
│   │   ├── ContactUs.tsx
│   │   ├── HomePage.tsx
│   │   ├── Insights.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── Projects.tsx
│   │   ├── SectorPage.tsx
│   │   ├── Sectors.tsx
│   │   ├── ServiceDetailsPage.tsx
│   │   └── Services.tsx
│   │
│   ├── services/                # API service layer
│   │   └── api.ts               # Centralized API functions
│   │
│   ├── utils/                   # Utility functions
│   │   └── apiHelpers.ts        # API helper utilities
│   │
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
│
├── .env                         # Environment variables
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # Project readme
```

---

## Core Features

### 1. Dynamic Content Management
- **Services**: Hierarchical service categories with detailed descriptions
- **Projects**: Featured projects with gallery images and related projects
- **Sectors**: Industry sectors (Healthcare, Residential, Education, etc.)
- **Blog**: Articles with filtering by type, sector, and service
- **Careers**: Job listings with application forms

### 2. SEO Optimization
- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org structured data
- Canonical URLs
- Custom meta descriptions and keywords

### 3. Animations & Interactions
- **Scroll-triggered animations** using Framer Motion's `whileInView`
- **GSAP ScrollTrigger** for complex scroll effects (Hero section)
- **Page transitions** with smooth fade and slide effects
- **Hover effects** on cards and interactive elements
- **Stagger animations** for list items and grids

### 4. Responsive Design
- **Mobile-first approach**
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: ≥ 1024px
- **Grid layouts**: Adaptive column counts (1/2/3 columns)
- **Touch-friendly** navigation and interactions

### 5. User Experience
- **Floating scroll-to-top button** (appears after 300px scroll)
- **Breadcrumb navigation** on detail pages
- **Loading states** with skeleton screens
- **Error handling** with user-friendly messages
- **Page loader** on home page (1.5s minimum)

---

## API Integration

### Base URL Configuration
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
```

### Environment Variable
```env
VITE_API_BASE_URL=http://xeluxe-admin.local
```

### API Endpoints

#### Settings API
```typescript
GET /public-api/settings.php
Response: { success: boolean, settings: SettingsData }
```

#### Services API
```typescript
GET /public-api/service-categories.php
Response: { success: boolean, data: ServiceCategory[] }

GET /public-api/service.php?slug={slug}
Response: { success: boolean, data: { service: ServiceDetail, related_services: RelatedService[] } }
```

#### Projects API
```typescript
GET /public-api/featured-projects.php
Response: { success: boolean, data: FeaturedProjectItem[], count: number }

GET /public-api/project.php?slug={slug}
Response: { success: boolean, data: { project: ProjectDetail, related_projects: RelatedProject[] } }

GET /public-api/project-categories.php
Response: { success: boolean, data: ProjectCategory[] }
```

#### Sectors API
```typescript
GET /public-api/featured-sectors.php
Response: { success: boolean, data: FeaturedSectorItem[], count: number }

GET /public-api/sector.php?slug={slug}
Response: { success: boolean, data: { sector: SectorData, featured_projects: FeaturedProject[] } }
```

#### Blog API
```typescript
GET /public-api/blog.php?page=1&per_page=9&type={type}&sector={id}&service={id}
Response: { success: boolean, data: BlogPost[], pagination: PaginationData }

GET /public-api/blog.php?slug={slug}
Response: { success: boolean, data: BlogPost }

GET /public-api/blog-filters.php
Response: { success: boolean, data: { types: string[], sectors: FilterOption[], services: FilterOption[] } }
```

#### Careers API
```typescript
GET /public-api/careers.php?page=1&per_page=6
Response: { success: boolean, data: Career[], pagination: PaginationData }

GET /public-api/career.php?slug={slug}
Response: { success: boolean, data: CareerDetail }
```

#### SEO API
```typescript
GET /public-api/seo.php?page_identifier={path}
Response: { success: boolean, data: SeoData }
```

### API Service Layer Architecture

```typescript
// Generic fetch wrapper with error handling
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
```

---

## State Management

### Context Providers

#### 1. SettingsContext
**Purpose:** Global application settings (site name, contact info, hero content, etc.)

```typescript
interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
}
```

**Usage:**
```tsx
const { settings } = useSettings();
```

#### 2. ServiceMenuContext
**Purpose:** Manage service menu state in header

```typescript
interface ServiceMenuContextType {
  isServiceMenuOpen: boolean;
  setIsServiceMenuOpen: (isOpen: boolean) => void;
}
```

#### 3. ProjectMenuContext
**Purpose:** Manage project menu state in header

```typescript
interface ProjectMenuContextType {
  isProjectMenuOpen: boolean;
  setIsProjectMenuOpen: (isOpen: boolean) => void;
}
```

### Custom Hooks

#### useSEO Hook
**Purpose:** Fetch and manage SEO data for current page

```typescript
export const useSEO = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  
  // Fetches SEO data based on current pathname
  // Returns: { seoData, loading }
}
```

---

## Routing & Navigation

### Route Configuration

```tsx
<Router>
  <ScrollRestoration />
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="services" element={<Services />} />
      <Route path="service/:slug" element={<ServiceDetailsPage />} />
      <Route path="services/:slug" element={<ServiceDetailsPage />} />
      <Route path="sectors" element={<Sectors />} />
      <Route path="sector/:slug" element={<SectorPage />} />
      <Route path="projects" element={<Projects />} />
      <Route path="project/:slug" element={<ProjectDetailsPage />} />
      <Route path="blog" element={<Blogs />} />
      <Route path="blog-details/:slug" element={<BlogDetailsPage />} />
      <Route path="careers" element={<CareersPage />} />
      <Route path="career-details/:slug" element={<CareerDetailsPage />} />
      <Route path="contact-us" element={<ContactUs />} />
    </Route>
  </Routes>
</Router>
```

### Scroll Restoration Strategy

**Problem:** React Router's SPA navigation doesn't scroll to top by default.

**Solution:** Custom scroll restoration implementation

```typescript
// 1. Disable browser's native scroll restoration
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// 2. Listen to popstate events (browser back/forward)
window.addEventListener('popstate', () => {
  window.scrollTo(0, 0);
});

// 3. ScrollRestoration component
function ScrollRestoration() {
  const location = useLocation();
  
  useLayoutEffect(() => {
    // Immediate scroll before paint
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Delayed scroll for async content
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.key]);
  
  return null;
}
```

### Navigation Approach

**Important:** All internal navigation uses regular `<a href>` tags instead of React Router's `<Link>` component to ensure full page reload and guaranteed scroll-to-top.

```tsx
// ✅ Correct approach
<a href="/service/fire-safety">Fire Safety</a>

// ❌ Not used
<Link to="/service/fire-safety">Fire Safety</Link>
```

**Reason:** Full page reloads ensure:
- Consistent scroll position (always top)
- Fresh data fetching
- Proper animation resets
- No state pollution between pages

---

## Styling Architecture

### CSS Modules

**Pattern:** Each component has its own scoped styles

```tsx
// Component.tsx
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

```css
/* Component.module.css */
.container {
  max-width: 1400px;
  margin: 0 auto;
}

.title {
  font-size: 3rem;
  font-weight: 800;
}
```

### Global Styles (index.css)

```css
/* Minimal reset */
html {
  font-size: 16px;
  overflow-x: hidden;
  scroll-behavior: auto !important;
  overflow-anchor: none;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-anchor: none;
  position: relative;
}
```

### Responsive Design Patterns

#### Grid Layout
```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Color Palette

```css
/* Primary Colors */
--primary-orange: #f8af1b;
--primary-dark: #1a1a1a;
--primary-white: #ffffff;

/* Neutral Colors */
--gray-100: #fafafa;
--gray-200: #f5f5f5;
--gray-300: #e5e5e5;
--gray-400: #d4d4d4;
--gray-500: #a3a3a3;
--gray-600: #737373;
--gray-700: #525252;
--gray-800: #404040;
--gray-900: #262626;

/* Semantic Colors */
--success: #22c55e;
--error: #ef4444;
--warning: #f59e0b;
```

---

## Build & Deployment

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Output directory: dist/
# - dist/index.html
# - dist/assets/
```

### Build Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Environment Variables

```env
# .env file
VITE_API_BASE_URL=http://xeluxe-admin.local
```

**Access in code:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Deployment Checklist

1. ✅ Update `VITE_API_BASE_URL` to production API URL
2. ✅ Run `npm run build`
3. ✅ Test build locally with `npm run preview`
4. ✅ Deploy `dist/` folder to web server
5. ✅ Configure server for SPA routing (redirect all routes to index.html)
6. ✅ Enable HTTPS
7. ✅ Configure CORS on backend API
8. ✅ Test all routes and functionality

### Server Configuration (Example for Apache)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Development Guidelines

### TypeScript Best Practices

#### Interface Definitions
```typescript
// Define clear interfaces for all data structures
export interface ServiceCategory {
  id: number;
  category_name: string;
  slug: string;
  featured_image: string;
  short_description: string;
  services: Service[];
}
```

#### Type Safety
```typescript
// Use type assertions carefully
const response = await fetch(url);
const data = await response.json() as ServiceResponse;

// Prefer type guards
function isServiceCategory(obj: any): obj is ServiceCategory {
  return obj && typeof obj.id === 'number' && typeof obj.category_name === 'string';
}
```

### Component Structure

```tsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Component.module.css';

// 2. Type definitions
interface ComponentProps {
  title: string;
  items: Item[];
}

// 3. Component
const Component: React.FC<ComponentProps> = ({ title, items }) => {
  // 4. State
  const [loading, setLoading] = useState(true);
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 6. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 7. Render
  return (
    <div className={styles.component}>
      {/* JSX */}
    </div>
  );
};

// 8. Export
export default Component;
```

### Animation Patterns

#### Framer Motion - Scroll Animations
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

#### Stagger Animations
```tsx
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### API Integration Pattern

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getData();
      
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [dependencies]);
```

### Error Handling

```tsx
if (loading) {
  return <div className={styles.loading}>Loading...</div>;
}

if (error) {
  return (
    <div className={styles.error}>
      <h2>Error</h2>
      <p>{error}</p>
      <a href="/">Back to Home</a>
    </div>
  );
}

if (!data) {
  return (
    <div className={styles.notFound}>
      <h2>Not Found</h2>
      <p>The requested content could not be found.</p>
    </div>
  );
}
```

---

## Performance Optimizations

### 1. Code Splitting
- **Lazy Loading:** Pages are loaded on-demand
- **Dynamic Imports:** Large components imported when needed

### 2. Image Optimization
- **Responsive Images:** Different sizes for mobile/desktop
- **Lazy Loading:** Images load as they enter viewport
- **WebP Format:** Modern image format for smaller file sizes

### 3. Animation Performance
- **CSS Transforms:** Use `transform` instead of `top/left` for animations
- **Will-change:** Hint browser about animated properties
- **RequestAnimationFrame:** Smooth 60fps animations

```css
.animatedElement {
  will-change: transform, opacity;
  transform: translateZ(0); /* Hardware acceleration */
}
```

### 4. API Optimization
- **Caching:** Settings cached in Context
- **Debouncing:** Search inputs debounced
- **Pagination:** Large lists paginated server-side

### 5. Bundle Size Optimization
- **Tree Shaking:** Unused code eliminated
- **Code Splitting:** Separate chunks per route
- **Minification:** CSS and JS minified in production

### Current Bundle Size
```
dist/index.html                   1.48 kB │ gzip:   0.79 kB
dist/assets/index-EUarcmvQ.css  147.45 kB │ gzip:  22.73 kB
dist/assets/index-agre4_-L.js   539.92 kB │ gzip: 176.42 kB
```

**Optimization Recommendations:**
1. Implement route-based code splitting
2. Use dynamic imports for heavy components
3. Optimize Framer Motion bundle (use `LazyMotion`)
4. Consider CDN for GSAP library

---

## Common Issues & Solutions

### Issue: Scroll Position Not Resetting
**Solution:** Full page reload navigation with `<a href>` instead of `<Link to>`

### Issue: Animations Not Triggering
**Solution:** Ensure `viewport={{ once: true }}` is set, check `whileInView` setup

### Issue: API Requests Failing
**Solution:** Verify `VITE_API_BASE_URL` is set correctly, check CORS configuration

### Issue: Build Errors
**Solution:** Run `npm run build` to check TypeScript errors, fix type issues

### Issue: Slow Page Load
**Solution:** Implement lazy loading, optimize images, reduce bundle size

---

## Maintenance & Updates

### Regular Tasks
1. **Dependency Updates:** Run `npm outdated` monthly
2. **Security Patches:** Run `npm audit` weekly
3. **Performance Monitoring:** Check Lighthouse scores
4. **Content Updates:** Update via backend CMS

### Breaking Changes Checklist
- ✅ Update TypeScript version
- ✅ Test all API integrations
- ✅ Verify build process
- ✅ Check animation compatibility
- ✅ Test on multiple browsers

---

## Testing Recommendations

### Manual Testing Checklist
- [ ] All routes load correctly
- [ ] Scroll-to-top works on all pages
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Animations trigger correctly
- [ ] Mobile responsive design works
- [ ] SEO meta tags present
- [ ] API calls succeed

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

---

## Contact & Support

**Project Repository:** https://github.com/jipinm/xeluxe  
**Documentation Date:** November 24, 2025  
**Version:** 1.0.0

For questions or issues, please refer to the GitHub repository or contact the development team.

---

**END OF DOCUMENTATION**
