import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PageLoader from './components/PageLoader/PageLoader'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import SEO from './components/SEO/SEO'
import { useSEO } from './hooks/useSEO'
import './App.css'

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isHomePage = location.pathname === '/';
  const { seoData } = useSEO();

  // Handle page loading (only for home page)
  useEffect(() => {
    if (!isHomePage) {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => {
      // Add a minimum loading time for better UX on home page
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isHomePage]);

  // Show loading when navigating to home page
  useEffect(() => {
    if (isHomePage) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, isHomePage]);

  return (
    <div className="App">
      <SEO seoData={seoData} />
      {isHomePage && isLoading && <PageLoader />}
      <Header />
      <main 
        style={!isHomePage ? { paddingTop: '130px' } : undefined}
        key={location.pathname + location.search}
      >
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
