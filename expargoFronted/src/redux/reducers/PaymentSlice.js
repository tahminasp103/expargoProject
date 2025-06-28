// redux/reducers/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateBalance } from './authSlice';  // Auth slice-dan import

export const checkCard = createAsyncThunk(
  'payment/checkCard',
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7777/api/payment/check-card', cardData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Xəta baş verdi' });
    }
  }
);
export const getPaymentsByUser = createAsyncThunk(
  'payment/getPaymentsByUser',
  async (userId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
   const { data } = await axios.get(`http://localhost:7777/api/payment/user/${userId}`, config);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Xəta baş verdi' });
    }
  }
);


export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post('http://localhost:7777/api/payment', paymentData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
     loading: false,
    paymentResult: null,
    error: null,
    lastPayment: null,
    payments: [],
    paymentsLoading: false,
    paymentsError: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.paymentResult = null;
      state.error = null;
      state.lastPayment = null;
      state.payments = [];
      state.paymentsLoading = false;
      state.paymentsError = null;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload.message;
        state.lastPayment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Ödəniş zamanı xəta';
      })

      .addCase(getPaymentsByUser.pending, (state) => {
        state.paymentsLoading = true;
        state.paymentsError = null;
      })
      .addCase(getPaymentsByUser.fulfilled, (state, action) => {
        state.paymentsLoading = false;
        state.payments = action.payload;
      })
      .addCase(getPaymentsByUser.rejected, (state, action) => {
        state.paymentsLoading = false;
        state.paymentsError = action.payload?.message || 'Ödənişlər gətirilərkən xəta';
      });
  },
});
export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

// redux/reducers/authSlice.j
