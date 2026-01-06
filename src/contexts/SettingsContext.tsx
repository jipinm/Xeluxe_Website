import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useApi } from '../hooks/useApi';
import api from '../services/api';

/**
 * Settings context type definition
 */
type Settings = Record<string, string>;

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Settings context
 */
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * Settings Provider Component
 * 
 * Wraps the application to provide global access to site settings
 * from the CMS backend.
 * 
 * @example
 * // In your App.tsx or main.tsx
 * import { SettingsProvider } from './contexts/SettingsContext';
 * 
 * function App() {
 *   return (
 *     <SettingsProvider>
 *       <Router>
 *         <Routes>
 *           ...
 *         </Routes>
 *       </Router>
 *     </SettingsProvider>
 *   );
 * }
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useApi(
    () => api.settings.getSettings(),
    []
  );

  const value: SettingsContextType = {
    settings: data?.parsed || null,
    loading,
    error,
    refetch,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * Custom hook to access settings context
 * 
 * @throws Error if used outside of SettingsProvider
 * 
 * @example
 * function Header() {
 *   const { settings, loading } = useSettings();
 *   
 *   if (loading) return <div>Loading...</div>;
 *   
 *   return (
 *     <header>
 *       <img src={settings?.logo_url} alt={settings?.logo_alt_text} />
 *       <p>{settings?.logo_tagline_1}</p>
 *     </header>
 *   );
 * }
 */
export function useSettings() {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
}

/**
 * Higher-order component to inject settings as props
 * 
 * @example
 * interface Props {
 *   settings: Settings;
 *   customProp: string;
 * }
 * 
 * function MyComponent({ settings, customProp }: Props) {
 *   return <div>{settings.logo_tagline_1}</div>;
 * }
 * 
 * export default withSettings(MyComponent);
 */
export function withSettings<P extends { settings: Settings | null }>(
  Component: React.ComponentType<P>
) {
  return function SettingsWrappedComponent(props: Omit<P, 'settings'>) {
    const { settings } = useSettings();
    return <Component {...(props as P)} settings={settings} />;
  };
}
