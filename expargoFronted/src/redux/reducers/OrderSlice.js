import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'Token tapılmadı. Giriş edin.' });
    }
    try {
      const { data } = await axios.post(
        'http://localhost:7777/api/orders',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Naməlum xəta' });
    }
  }
);

export const getOrdersByUser = createAsyncThunk(
  'order/getOrdersByUser',
  async (userId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`http://localhost:7777/api/orders/user/${userId}`, config);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Sifarişlər yüklənmədi' });
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    order: null,
    error: null,
    userOrders: [],
    userOrdersLoading: false,
    userOrdersError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xəta baş verdi';
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.userOrdersLoading = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
