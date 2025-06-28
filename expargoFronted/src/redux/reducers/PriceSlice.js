// src/redux/reducers/priceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API baza URL
const API_URL = 'http://localhost:7777/api/prices';

// 1️⃣ Qiymətləri götürmək üçün thunk
export const fetchPrices = createAsyncThunk(
  'prices/fetchPrices',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Qiymətləri gətirərkən xəta baş verdi');
    }
  }
);

// 2️⃣ Yeni qiymət əlavə etmək üçün thunk
export const addPrice = createAsyncThunk(
  'prices/addPrice',
  async (priceData, thunkAPI) => {
    console.log('Göndərilən priceData:', priceData);
    try {
      const token = thunkAPI.getState().admin.token;
      const response = await axios.post(API_URL, priceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Server error response:', error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Qiymət əlavə edilərkən xəta baş verdi');
    }
  }
);

// 3️⃣ Qiyməti yeniləmək üçün thunk
export const updatePrice = createAsyncThunk(
  'prices/updatePrice',
  async ({ id, ...priceData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.token;
      const response = await axios.put(`${API_URL}/${id}`, priceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Qiymət yenilənərkən xəta baş verdi');
    }
  }
);

// 4️⃣ Qiyməti silmək üçün thunk
export const deletePrice = createAsyncThunk(
  'prices/deletePrice',
  async (id, thunkAPI) => {
    console.log('Deleting price with id:', id);
    try {
      const token = thunkAPI.getState().admin.token;
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error('Delete price error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Qiymət silinərkən xəta baş verdi');
    }
  }
);

const initialState = {
  prices: [],
  loading: false,
  error: null,
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    clearPriceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPrices
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addPrice
      .addCase(addPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices.push(action.payload);
      })
      .addCase(addPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePrice
      .addCase(updatePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.prices.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) {
          state.prices[idx] = action.payload;
        }
      })
      .addCase(updatePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deletePrice
      .addCase(deletePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = state.prices.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPriceError } = priceSlice.actions;
export default priceSlice.reducer;
