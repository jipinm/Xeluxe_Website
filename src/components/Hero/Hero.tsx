import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './Hero.module.css';

// Declare Vimeo Player for TypeScript
declare global {
  interface Window {
    Vimeo: any;
  }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fallback video if API doesn't return one
const DEFAULT_HERO_VIDEO = "https://vimeo.com/1133019396";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { settings } = useSettings();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for trust indicators
      gsap.to(`.${styles.trustItem}`, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.2
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Get video URL from settings or use default
  const videoUrl = settings?.hero_video_url || DEFAULT_HERO_VIDEO;

  return (
    <section ref={heroRef} id="home" className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoBackground}>
        {/* Video Overlay for better text readability */}
        <div className={styles.videoOverlay}></div>
        <motion.iframe
          src={videoUrl}
          className={styles.backgroundVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default Hero;
