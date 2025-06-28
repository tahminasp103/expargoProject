import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7777/api/faqs';

export const fetchFaqs = createAsyncThunk('faqs/fetchFaqs', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addFaq = createAsyncThunk('faqs/addFaq', async (faqData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(API_URL, faqData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
});

export const updateFaq = createAsyncThunk('faqs/updateFaq', async ({ id, faqData }) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/${id}`, faqData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
});

export const deleteFaq = createAsyncThunk('faqs/deleteFaq', async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return id;
});


const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    faqs: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
.addCase(addFaq.fulfilled, (state, action) => {
  // Əvvəlcə əlavə olunan FAQ-un ID-sini al
  const newFaqId = action.payload.id || action.payload._id;

  // Əgər artıq həmin ID-dən varsa, əlavə etmə
  const exists = state.faqs.some(faq => (faq.id || faq._id) === newFaqId);

  if (!exists) {
    state.faqs.push(action.payload);
  }
})

.addCase(updateFaq.fulfilled, (state, action) => {
  const updatedFaqId = action.payload.id || action.payload._id;
  const index = state.faqs.findIndex(faq => (faq.id || faq._id) === updatedFaqId);
  if (index !== -1) {
    state.faqs[index] = action.payload;
  }
})

.addCase(deleteFaq.fulfilled, (state, action) => {
  state.faqs = state.faqs.filter(faq => (faq.id || faq._id) !== action.payload);
});

  }
});

export default faqSlice.reducer;
