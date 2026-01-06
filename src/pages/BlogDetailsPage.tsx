import React from 'react';
import BlogDetails from '../components/BlogDetails/BlogDetails';
import styles from './BlogDetailsPage.module.css';

const BlogDetailsPage: React.FC = () => {
  return (
    <div className={styles.blogDetailsPage}>
      <main className={styles.mainContent}>
        <BlogDetails />
      </main>
    </div>
  );
};

export default BlogDetailsPage;
