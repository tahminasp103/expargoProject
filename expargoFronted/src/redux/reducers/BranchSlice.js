// src/redux/reducers/BranchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7777/api/branches';

// Tokeni cookie-dən oxuyan funksiya
const getToken = () => {
   return localStorage.getItem('token'); 
};

// Filialları yüklə
export const fetchBranches = createAsyncThunk('branch/fetchBranches', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Yeni filial əlavə et
export const createBranch = createAsyncThunk('branch/createBranch', async (branchData) => {
  const token = getToken();
  const res = await axios.post(API_URL, branchData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
});

// Filialı yenilə
export const updateBranch = createAsyncThunk('branch/updateBranch', async ({ id, branchData }) => {
  const token = getToken();
  const res = await axios.put(`${API_URL}/${id}`, branchData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
});

// Filialı sil
export const deleteBranch = createAsyncThunk('branch/deleteBranch', async (id) => {
  const token = getToken();
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return id;
});

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    branch: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branch = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createBranch.fulfilled, (state, action) => {
        state.branch.push(action.payload);
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        const index = state.branch.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.branch[index] = action.payload;
        }
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branch = state.branch.filter(b => b._id !== action.payload);
      });
  }
});

export default branchSlice.reducer;
