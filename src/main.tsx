import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Disable browser scroll restoration immediately
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Force scroll to top immediately on any navigation
window.addEventListener('popstate', () => {
  window.scrollTo(0, 0);
});

// Scroll restoration component with aggressive approach
function ScrollRestoration() {
  const location = useLocation();
  
  useLayoutEffect(() => {
    // Immediate scroll before anything renders
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Force scroll again after a tiny delay to catch any async content
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.key]);
  
  return null;
}
import { SettingsProvider } from './contexts/SettingsContext'
import { ServiceMenuProvider } from './contexts/ServiceMenuContext'
import { ProjectMenuProvider } from './contexts/ProjectMenuContext'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import AboutUs from './pages/AboutUs.tsx'
import Services from './pages/Services.tsx'
import ServiceDetailsPage from './pages/ServiceDetailsPage.tsx'
import Sectors from './pages/Sectors.tsx'
import Projects from './pages/Projects.tsx'
import ProjectDetailsPage from './pages/ProjectDetails.tsx'
import SectorPage from './pages/SectorPage.tsx'
import Insights from './pages/Insights.tsx'
import Blogs from './pages/Blogs.tsx'
import BlogDetailsPage from './pages/BlogDetailsPage.tsx'
import CareersPage from './pages/Careers.tsx'
import CareerDetailsPage from './pages/CareerDetails.tsx'
import ContactUs from './pages/ContactUs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ServiceMenuProvider>
        <ProjectMenuProvider>
          <Router>
            <ScrollRestoration />
            <Routes>
              <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="services" element={<Services />} />
            <Route path="service/:slug" element={<ServiceDetailsPage />} />
            {/* Support plural /services/:slug links from header dropdown */}
            <Route path="services/:slug" element={<ServiceDetailsPage />} />
            <Route path="sectors" element={<Sectors />} />
            <Route path="sector/:slug" element={<SectorPage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:slug" element={<ProjectDetailsPage />} />
            <Route path="insights" element={<Insights />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog-details/:slug" element={<BlogDetailsPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="career-details/:slug" element={<CareerDetailsPage />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>
        </Routes>
      </Router>
        </ProjectMenuProvider>
      </ServiceMenuProvider>
    </SettingsProvider>
  </StrictMode>,
)
