import React from 'react';
import IndustrySectors from '../components/IndustrySectors/IndustrySectors';
import styles from './Sectors.module.css';

const Sectors: React.FC = () => {
  return (
    <div className={styles.sectorsPage}>
      <main className={styles.mainContent}>
        <IndustrySectors />
      </main>
    </div>
  );
};

export default Sectors;
