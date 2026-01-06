import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { projectsApi } from '../services/api';
import type { ProjectCategory } from '../services/api';

interface ProjectMenuContextType {
  categories: ProjectCategory[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ProjectMenuContext = createContext<ProjectMenuContextType | undefined>(undefined);

interface ProjectMenuProviderProps {
  children: ReactNode;
}

export const ProjectMenuProvider: React.FC<ProjectMenuProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.getProjectCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        throw new Error('Failed to fetch project categories');
      }
    } catch (err) {
      console.error('Error fetching project categories:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setCategories([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value: ProjectMenuContextType = {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };

  return (
    <ProjectMenuContext.Provider value={value}>
      {children}
    </ProjectMenuContext.Provider>
  );
};

export const useProjectMenu = (): ProjectMenuContextType => {
  const context = useContext(ProjectMenuContext);
  if (context === undefined) {
    throw new Error('useProjectMenu must be used within a ProjectMenuProvider');
  }
  return context;
};
