import React from 'react';
import Blog from '../components/Blog/Blog';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './Blogs.module.css';

const Blogs: React.FC = () => {
  return (
    <div className={styles.blogsPage}>
      <InternalHeader pageTitle="Insights" />
      <main className={styles.mainContent}>
        <Blog />
      </main>
    </div>
  );
};

export default Blogs;
