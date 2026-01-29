import React from 'react';
import IndustrySectors from '../components/IndustrySectors/IndustrySectors';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './Sectors.module.css';

const Sectors: React.FC = () => {
  return (
    <div className={styles.sectorsPage}>
      <InternalHeader pageTitle="Industry Sectors" />
      <main className={styles.mainContent}>
        <IndustrySectors />
      </main>
    </div>
  );
};

export default Sectors;
