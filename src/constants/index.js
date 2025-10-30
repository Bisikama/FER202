// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://YOUR_PROJECT_ID.mockapi.io/api/v1';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// API Endpoints
export const API_ENDPOINTS = {
  ORCHIDS: '/orchids',
  ORCHID_BY_ID: (id) => `/orchids/${id}`,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
};

// Orchid Categories
export const ORCHID_CATEGORIES = [
  'Phalaenopsis',
  'Cattleya',
  'Dendrobium',
  'Vanda',
  'Oncidium',
  'Cymbidium',
  'Paphiopedilum',
  'Other',
];

// Filter Options
export const FILTER_OPTIONS = {
  ALL: 'All',
  NATURAL: 'Natural',
  SPECIAL: 'Special',
};

// Status Messages
export const MESSAGES = {
  SUCCESS: {
    CREATE: '✅ Orchid created successfully!',
    UPDATE: '✅ Orchid updated successfully!',
    DELETE: '✅ Orchid deleted successfully!',
    LOGIN: '✅ Login successful!',
  },
  ERROR: {
    CREATE: '❌ Failed to create orchid',
    UPDATE: '❌ Failed to update orchid',
    DELETE: '❌ Failed to delete orchid',
    FETCH: '❌ Failed to fetch orchids',
    LOGIN: '❌ Login failed',
    NETWORK: '❌ Network error. Please check your connection.',
  },
  CONFIRM: {
    DELETE: 'Are you sure you want to delete this orchid?',
  },
};

export default {
  API_BASE_URL,
  GOOGLE_CLIENT_ID,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ORCHID_CATEGORIES,
  FILTER_OPTIONS,
  MESSAGES,
};
