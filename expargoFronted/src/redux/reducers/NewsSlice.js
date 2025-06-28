import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7777/api/news';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get(API_URL, { withCredentials: true });
  return data;
});

export const createNews = createAsyncThunk(
  'news/createNews',
  async (newsData, thunkAPI) => {
    // token Redux-dan alınır
    const state = thunkAPI.getState();
    const token = state.admin.token;

    console.log('[TOKEN]', token); // Yoxla burada null deyil

    try {
      const response = await axios.post(
        'http://localhost:7777/api/news',
        newsData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Xəta baş verdi');
    }
  }
);


export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ id, newsData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue('Token not found.');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const { data } = await axios.put(`${API_URL}/${id}`, newsData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue('Token not found.');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.newsList.push(action.payload);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.newsList.findIndex((n) => n._id === action.payload._id);
        if (index !== -1) state.newsList[index] = action.payload;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.newsList = state.newsList.filter((n) => n._id !== action.payload);
      });


  },
});

export default newsSlice.reducer;
