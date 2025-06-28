import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdminPackages = createAsyncThunk('packages/fetchAdminPackages', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('http://localhost:7777/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Xəta baş verdi');
  }
});

export const updatePackageStatus = createAsyncThunk(
  'packages/updatePackageStatus',
  async ({ id, status, trackingLink }, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.patch(
        `http://localhost:7777/api/orders/${id}`,
        { status, trackingLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Xəta baş verdi');
    }
  }
);

const packageSlice = createSlice({
  name: 'packages',
  initialState: { packages: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdminPackages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchAdminPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePackageStatus.fulfilled, (state, action) => {
        const idx = state.packages.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) {
          state.packages[idx] = action.payload;
        }
      });
  }
});

export default packageSlice.reducer;
