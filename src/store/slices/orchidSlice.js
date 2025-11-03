import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrchids, getOrchidById, createOrchid, updateOrchid, deleteOrchid } from '../../services/api';

// Async thunks
export const fetchOrchids = createAsyncThunk(
  'orchids/fetchOrchids',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllOrchids();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrchidById = createAsyncThunk(
  'orchids/fetchOrchidById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getOrchidById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrchid = createAsyncThunk(
  'orchids/addOrchid',
  async (orchidData, { rejectWithValue }) => {
    try {
      const data = await createOrchid(orchidData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOrchid = createAsyncThunk(
  'orchids/editOrchid',
  async ({ id, orchidData }, { rejectWithValue }) => {
    try {
      const data = await updateOrchid(id, orchidData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOrchid = createAsyncThunk(
  'orchids/removeOrchid',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrchid(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  orchids: [],
  selectedOrchid: null,
  filteredOrchids: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterCategory: 'All',
};

// Helper function to apply combined filters
const applyFilters = (state) => {
  let filtered = state.orchids;

  // Apply category filter
  if (state.filterCategory === 'Natural') {
    filtered = filtered.filter(orchid => orchid.isNatural === true);
  } else if (state.filterCategory === 'Special') {
    filtered = filtered.filter(orchid => orchid.isSpecial === true);
  }
  // 'All' means no category filter

  // Apply search term filter
  if (state.searchTerm !== '') {
    filtered = filtered.filter(orchid =>
      orchid.name?.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  state.filteredOrchids = filtered;
};

// Slice
const orchidSlice = createSlice({
  name: 'orchids',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Apply combined filter
      applyFilters(state);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      // Apply combined filter
      applyFilters(state);
    },
    clearSelectedOrchid: (state) => {
      state.selectedOrchid = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all orchids
      .addCase(fetchOrchids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids = action.payload;
        state.filteredOrchids = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch orchid by ID
      .addCase(fetchOrchidById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchidById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrchid = action.payload;
      })
      .addCase(fetchOrchidById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add orchid
      .addCase(addOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids.push(action.payload);
        state.filteredOrchids.push(action.payload);
      })
      .addCase(addOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Edit orchid
      .addCase(editOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrchid.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orchids.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orchids[index] = action.payload;
        }
        const filteredIndex = state.filteredOrchids.findIndex(o => o.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredOrchids[filteredIndex] = action.payload;
        }
      })
      .addCase(editOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove orchid
      .addCase(removeOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids = state.orchids.filter(o => o.id !== action.payload);
        state.filteredOrchids = state.filteredOrchids.filter(o => o.id !== action.payload);
      })
      .addCase(removeOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setFilterCategory, clearSelectedOrchid } = orchidSlice.actions;
export default orchidSlice.reducer;
