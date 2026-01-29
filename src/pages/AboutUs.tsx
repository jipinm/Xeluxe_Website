import React, { useEffect, useState } from 'react';
import WhoWeAreSection from '../components/WhoWeAreSection/WhoWeAreSection';
import VisionMissionValuesSection from '../components/VisionMissionValuesSection/VisionMissionValuesSection';
import Leadership from '../components/Leadership/Leadership';
import { aboutUsApi } from '../services/api';
import type { AboutUsData } from '../services/api';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await aboutUsApi.getAboutUs();
        if (response.success && response.data) {
          setAboutUsData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch About Us data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  if (loading) {
    return (
      <div className={styles.aboutUsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingText}>Loading about us...</p>
          <div className={styles.skeletonLayout}>
            {/* Who We Are Section */}
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonTwoColumn}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonText} style={{ width: '95%' }}></div>
                  <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
            {/* Vision Mission Values Section */}
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonCardsGrid}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonCardTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Leadership Section */}
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonTeamGrid}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={styles.skeletonTeamCard}>
                    <div className={styles.skeletonTeamImage}></div>
                    <div className={styles.skeletonTeamName}></div>
                    <div className={styles.skeletonTeamRole}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!aboutUsData) {
    return (
      <div className={styles.aboutUsPage}>
        <div className={styles.error}>Failed to load content</div>
      </div>
    );
  }

  return (
    <div className={styles.aboutUsPage}>
      <InternalHeader pageTitle="About Us" />
      <main className={styles.mainContent}>
        <WhoWeAreSection data={aboutUsData.about_us} />
        <VisionMissionValuesSection 
          data={aboutUsData.vision_mission}
          values={aboutUsData.values}
        />
        <Leadership 
          data={aboutUsData.leadership} 
          teamMembers={aboutUsData.team_members} 
        />
      </main>
    </div>
  );
};

export default AboutUs;