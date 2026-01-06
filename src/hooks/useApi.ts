import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook state interface
 */
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook for API calls with loading and error states
 * 
 * @param apiFunction - The API function to call
 * @param dependencies - Dependencies array to trigger refetch
 * @param immediate - Whether to call the API immediately on mount (default: true)
 * 
 * @example
 * const { data, loading, error, refetch } = useApi(
 *   () => api.services.getServices(),
 *   []
 * );
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
  immediate: boolean = true
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Custom hook for API calls that require parameters
 * Only calls the API when execute is called
 * 
 * @example
 * const { data, loading, error, execute } = useLazyApi(
 *   (id: number) => api.services.getServiceById(id)
 * );
 * 
 * // Later...
 * execute(123);
 */
export function useLazyApi<T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>
): UseApiState<T> & { execute: (...params: P) => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...params: P) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
    execute,
  };
}

/**
 * Custom hook for form submissions
 * 
 * @example
 * const { loading, error, success, submit } = useApiSubmit(
 *   (formData) => api.contact.submitContactForm(formData)
 * );
 */
export function useApiSubmit<T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>
): {
  loading: boolean;
  error: Error | null;
  success: boolean;
  data: T | null;
  submit: (...params: P) => Promise<void>;
  reset: () => void;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const submit = useCallback(async (...params: P) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await apiFunction(...params);
      setData(result);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Submission failed'));
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setData(null);
  }, []);

  return {
    loading,
    error,
    success,
    data,
    submit,
    reset,
  };
}
