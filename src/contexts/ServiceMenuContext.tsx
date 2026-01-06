import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { servicesApi } from '../services/api';
import type { ServiceCategory } from '../services/api';

interface ServiceMenuContextType {
  categories: ServiceCategory[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ServiceMenuContext = createContext<ServiceMenuContextType | undefined>(undefined);

interface ServiceMenuProviderProps {
  children: ReactNode;
}

export const ServiceMenuProvider: React.FC<ServiceMenuProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await servicesApi.getServiceCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        throw new Error('Failed to fetch service categories');
      }
    } catch (err) {
      console.error('Error fetching service categories:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setCategories([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value: ServiceMenuContextType = {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };

  return (
    <ServiceMenuContext.Provider value={value}>
      {children}
    </ServiceMenuContext.Provider>
  );
};

export const useServiceMenu = (): ServiceMenuContextType => {
  const context = useContext(ServiceMenuContext);
  if (context === undefined) {
    throw new Error('useServiceMenu must be used within a ServiceMenuProvider');
  }
  return context;
};
