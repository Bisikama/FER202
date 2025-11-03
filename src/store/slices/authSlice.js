import { createSlice } from '@reduxjs/toolkit';

// Admin emails list - hardcoded
const ADMIN_EMAILS = [
  'admin@orchid.com',
  'orchidadmin@gmail.com',
  'minhbao28032005@gmail.com'
];

// Helper function to determine user role
const getUserRole = (email) => {
  return ADMIN_EMAILS.includes(email?.toLowerCase()) ? 'admin' : 'member';
};

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      // Add role to user object
      const userWithRole = {
        ...action.payload.user,
        role: getUserRole(action.payload.user.email)
      };
      
      state.user = userWithRole;
      state.token = action.payload.token;
      
      // Lưu token và user vào localStorage
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(userWithRole));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      // Xóa token khỏi localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
