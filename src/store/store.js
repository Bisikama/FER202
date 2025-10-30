import { configureStore } from '@reduxjs/toolkit';
import orchidReducer from './slices/orchidSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    orchids: orchidReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
