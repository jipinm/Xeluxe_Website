import React from 'react';
import ComingSoon from '../components/ComingSoon/ComingSoon';
import styles from './Insights.module.css';

const Insights: React.FC = () => {
  return (
    <div className={styles.insightsPage}>
      <main className={styles.mainContent}>
        <ComingSoon />
      </main>
    </div>
  );
};

export default Insights;
