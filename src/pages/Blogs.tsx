import React from 'react';
import Blog from '../components/Blog/Blog';
import styles from './Blogs.module.css';

const Blogs: React.FC = () => {
  return (
    <div className={styles.blogsPage}>
      <main className={styles.mainContent}>
        <Blog />
      </main>
    </div>
  );
};

export default Blogs;
