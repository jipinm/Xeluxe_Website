import React, { useEffect, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import HeaderContent from '../shared/HeaderContent/HeaderContent';
import styles from './InternalHeader.module.css';

interface InternalHeaderProps {
  pageTitle?: string;
}

const InternalHeader: React.FC<InternalHeaderProps> = ({ pageTitle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get video URL from settings (same as home page)
  const videoUrl = settings?.hero_video_url || '';

  return (
    <div className={styles.internalHeaderWrapper}>
      {/* Hero Section with Video Background */}
      <div className={styles.heroSection}>
        <div className={styles.heroVideoContainer}>
          <iframe
            src={videoUrl}
            className={styles.heroVideo}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Hero Background Video"
          />
        </div>
        <div className={styles.heroOverlay}></div>
        
        {/* Header Navigation */}
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
          <HeaderContent styles={styles} />
        </header>
        
        {/* Page Title */}
        {pageTitle && (
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalHeader;
