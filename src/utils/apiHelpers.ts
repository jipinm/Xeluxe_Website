/**
 * API Utility Functions
 * Helper functions for working with API data
 */

/**
 * Parse comma-separated image URLs
 * @param imageString - Comma-separated image URLs
 * @returns Array of image URLs
 */
export function parseImageGallery(imageString: string | null | undefined): string[] {
  if (!imageString) return [];
  return imageString.split(',').map(url => url.trim()).filter(Boolean);
}

/**
 * Parse newline-separated list
 * @param listString - Newline-separated text
 * @returns Array of strings
 */
export function parseList(listString: string | null | undefined): string[] {
  if (!listString) return [];
  return listString.split('\n').map(item => item.trim()).filter(Boolean);
}

/**
 * Format date string
 * @param dateString - Date string from API
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get full image URL
 * @param imagePath - Relative or absolute image path
 * @param baseUrl - API base URL (optional)
 * @returns Full image URL
 */
export function getImageUrl(
  imagePath: string | null | undefined,
  baseUrl?: string
): string {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If starts with /, prepend base URL
  if (imagePath.startsWith('/')) {
    const apiBaseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL || '';
    return `${apiBaseUrl}${imagePath}`;
  }
  
  return imagePath;
}

/**
 * Extract excerpt from HTML content
 * @param htmlContent - HTML content string
 * @param maxLength - Maximum length of excerpt (default: 150)
 * @returns Plain text excerpt
 */
export function extractExcerpt(
  htmlContent: string | null | undefined,
  maxLength: number = 150
): string {
  if (!htmlContent) return '';
  
  // Remove HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, '');
  
  // Trim to max length
  if (text.length <= maxLength) return text;
  
  // Find last complete word within max length
  const trimmed = text.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  
  return trimmed.substring(0, lastSpace) + '...';
}

/**
 * Build query string from object
 * @param params - Object with query parameters
 * @returns Query string (without leading ?)
 */
export function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  
  return query.toString();
}

/**
 * Check if response is successful
 * @param response - API response
 * @returns True if successful
 */
export function isSuccessResponse(response: any): boolean {
  return response && response.success === true;
}

/**
 * Extract error message from response
 * @param error - Error object or response
 * @returns Error message string
 */
export function getErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Debounce function for API calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for API calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Retry failed API call
 * @param fn - Async function to retry
 * @param retries - Number of retries (default: 3)
 * @param delay - Delay between retries in ms (default: 1000)
 * @returns Promise with result
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryApiCall(fn, retries - 1, delay * 2); // Exponential backoff
  }
}

/**
 * Cache API response in localStorage
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds (default: 5 minutes)
 */
export function cacheResponse(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
  try {
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(`api_cache_${key}`, JSON.stringify(item));
  } catch (error) {
    console.warn('Failed to cache response:', error);
  }
}

/**
 * Get cached API response from localStorage
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export function getCachedResponse<T = any>(key: string): T | null {
  try {
    const cached = localStorage.getItem(`api_cache_${key}`);
    if (!cached) return null;
    
    const item = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is expired
    if (now - item.timestamp > item.ttl) {
      localStorage.removeItem(`api_cache_${key}`);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.warn('Failed to get cached response:', error);
    return null;
  }
}

/**
 * Clear all cached API responses
 */
export function clearApiCache(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('api_cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear API cache:', error);
  }
}

/**
 * Format file size
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate email format
 * @param email - Email string
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize HTML content (basic)
 * @param html - HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  // This is a basic sanitization. For production, use a library like DOMPurify
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Create FormData from object
 * @param data - Object with key-value pairs
 * @returns FormData instance
 */
export function objectToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, String(item)));
      } else {
        formData.append(key, String(value));
      }
    }
  });
  
  return formData;
}

/**
 * Parse FAQ JSON string
 * @param faqString - JSON string with FAQs
 * @returns Array of FAQ objects
 */
export function parseFaqs(faqString: string | null | undefined): Array<{ question: string; answer: string }> {
  if (!faqString) return [];
  
  try {
    const faqs = JSON.parse(faqString);
    return Array.isArray(faqs) ? faqs : [];
  } catch {
    return [];
  }
}

/**
 * Group items by key
 * @param items - Array of items
 * @param key - Key to group by
 * @returns Object with grouped items
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Sort items by key
 * @param items - Array of items
 * @param key - Key to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array
 */
export function sortBy<T>(items: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}
