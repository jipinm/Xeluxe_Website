import React from 'react';
import BlogDetails from '../components/BlogDetails/BlogDetails';
import InternalHeader from '../components/InternalHeader/InternalHeader';
import styles from './BlogDetailsPage.module.css';

const BlogDetailsPage: React.FC = () => {
  return (
    <div className={styles.blogDetailsPage}>
      <InternalHeader pageTitle="Insights" />
      <main className={styles.mainContent}>
        <BlogDetails />
      </main>
    </div>
  );
};

export default BlogDetailsPage;
