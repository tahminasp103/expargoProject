// src/redux/slices/balanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0, // Başlanğıc balans, lazım gələrsə backend-dən gələn balansla əvəzlə
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;  // Balansı birbaşa təyin edir
    },
    incrementBalance: (state, action) => {
      state.balance += action.payload; // Balansı artırır
    },
  },
});

export const { setBalance, incrementBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
