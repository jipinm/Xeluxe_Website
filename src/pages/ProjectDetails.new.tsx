import React from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug } from '../data/projectsData';
import ProjectDetails from '../components/ProjectDetails/ProjectDetails';

const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Get the project data based on the slug
  const projectData = slug ? getProjectBySlug(slug) : null;

  if (!projectData) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Project Not Found</h1>
        <p>The requested project could not be found.</p>
      </div>
    );
  }

  return <ProjectDetails project={projectData} />;
};

export default ProjectDetailsPage;
