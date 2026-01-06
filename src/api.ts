/**
 * API Integration - Main Exports
 * 
 * Import everything you need from this single file
 */

// Main API service
export { default as api } from './services/api';

// Individual API services (if you want to import them separately)
export {
  settingsApi,
  aboutUsApi,
  servicesApi,
  projectsApi,
  blogApi,
  careersApi,
  clientsApi,
  recognitionsApi,
  contactApi,
  seoApi,
} from './services/api';

// Custom hooks
export { useApi, useLazyApi, useApiSubmit } from './hooks/useApi';

// Settings context
export { SettingsProvider, useSettings, withSettings } from './contexts/SettingsContext';

// Types (re-export for convenience)
export type { ApiResponse } from './services/api';
