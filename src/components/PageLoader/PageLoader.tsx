import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './PageLoader.module.css';

const PageLoader: React.FC = () => {
  const { settings } = useSettings();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img 
            src={settings?.logo_url ? `${API_BASE_URL}/${settings.logo_url}` : '/logo.png'} 
            alt={settings?.logo_alt_text || 'XELUXE'} 
            className={styles.logo}
          />
          <h2 className={styles.brandName}>XELUXE</h2>
          <p className={styles.tagline}>
            {settings?.logo_tagline_1 || 'Engineering a Sustainable'} {settings?.logo_tagline_2 || 'and Resilient Future - Together'}
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className={styles.loadingAnimation}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;