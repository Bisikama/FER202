import axios from 'axios';

// Base URL của MockAPI từ environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://6704347d0a340b270a44.mockapi.io/orchids";

// Tạo axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý khi token hết hạn
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ============ ORCHID API ENDPOINTS ============

// GET: Lấy tất cả orchids
export const getAllOrchids = async () => {
  try {
    const response = await api.get('/orchids');
    return response.data;
  } catch (error) {
    console.error('Error fetching orchids:', error);
    throw error;
  }
};

// GET: Lấy orchid theo ID
export const getOrchidById = async (id) => {
  try {
    const response = await api.get(`/orchids/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orchid ${id}:`, error);
    throw error;
  }
};

// POST: Tạo orchid mới
export const createOrchid = async (orchidData) => {
  try {
    const response = await api.post('/orchids', orchidData);
    return response.data;
  } catch (error) {
    console.error('Error creating orchid:', error);
    throw error;
  }
};

// PUT: Cập nhật orchid
export const updateOrchid = async (id, orchidData) => {
  try {
    const response = await api.put(`/orchids/${id}`, orchidData);
    return response.data;
  } catch (error) {
    console.error(`Error updating orchid ${id}:`, error);
    throw error;
  }
};

// DELETE: Xóa orchid
export const deleteOrchid = async (id) => {
  try {
    const response = await api.delete(`/orchids/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting orchid ${id}:`, error);
    throw error;
  }
};

// ============ SEARCH & FILTER ============

// Tìm kiếm orchids theo name
export const searchOrchids = async (searchTerm) => {
  try {
    const response = await api.get(`/orchids?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Error searching orchids:', error);
    throw error;
  }
};

// Lọc orchids theo category
export const filterOrchidsByCategory = async (category) => {
  try {
    const response = await api.get(`/orchids?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Error filtering orchids:', error);
    throw error;
  }
};

// ============ FETCH API (Alternative) ============

// Sử dụng fetch thay vì axios
export const fetchOrchidsWithFetch = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orchids`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching with fetch API:', error);
    throw error;
  }
};

export default api;
